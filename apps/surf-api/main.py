import os
import json
import logging
from datetime import date
from datetime import datetime, UTC
from pathlib import Path
from garminconnect import Garmin
from garminconnect.exceptions import GarminConnectConnectionError
from dotenv import load_dotenv

# Load variables from the .env file into os.environ
load_dotenv()

logger = logging.getLogger(__name__)


def _configure_tls_trust() -> str | None:
    """Configure CA trust for both requests and curl-cffi clients.

    Prefer GARMIN_CA_BUNDLE when present. This is useful on corporate
    networks where TLS traffic is inspected by a custom root certificate.
    """
    ca_bundle = os.getenv("GARMIN_CA_BUNDLE")

    if not ca_bundle:
        return None

    ca_bundle = os.path.expanduser(ca_bundle)
    if not os.path.isfile(ca_bundle):
        raise FileNotFoundError(
            f"GARMIN_CA_BUNDLE points to a missing file: {ca_bundle}"
        )

    # requests + urllib3
    os.environ["REQUESTS_CA_BUNDLE"] = ca_bundle
    os.environ["SSL_CERT_FILE"] = ca_bundle
    # curl-cffi / libcurl
    os.environ["CURL_CA_BUNDLE"] = ca_bundle

    return ca_bundle


def _normalize_activities(raw_activities: dict | list) -> list[dict]:
    """Handle API responses that may be list or dict wrapper."""
    if isinstance(raw_activities, dict):
        activities = raw_activities.get("activities", [])
    else:
        activities = raw_activities
    return [activity for activity in activities if isinstance(activity, dict)]


def _export_all_surfing_activities(
    client: Garmin, page_size: int = 100, output_dir: Path | None = None
) -> tuple[Path, int]:
    """Export all surfing activities with only requested fields."""
    start = 0
    all_surfing: list[dict] = []

    while True:
        page = _normalize_activities(client.get_activities(start=start, limit=page_size))
        if not page:
            break

        for activity in page:
            type_key = activity.get("activityType", {}).get("typeKey", "")
            if "surf" not in type_key:
                continue

            all_surfing.append(
                {
                    "activityId": activity.get("activityId"),
                    "startTimeGMT": activity.get("startTimeGMT"),
                    # Preserve field names as requested by downstream consumer.
                    "startLatitute": activity.get("startLatitude"),
                    "startLongitute": activity.get("startLongitude"),
                }
            )

        start += len(page)

    payload = {
        "exportedAt": datetime.now(UTC).isoformat(),
        "count": len(all_surfing),
        "activities": all_surfing,
    }

    if output_dir is None:
        output_dir = Path(__file__).resolve().parent / "data"

    output_dir.mkdir(parents=True, exist_ok=True)
    output_path = output_dir / f"garmin_surfing_activities.json"
    output_path.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    return output_path, len(all_surfing)


def _setup_logging() -> None:
    """Configure application logging once at startup."""
    log_level = os.getenv("LOG_LEVEL", "INFO").upper()
    logging.basicConfig(
        level=getattr(logging, log_level, logging.INFO),
        format="%(asctime)s %(levelname)s %(name)s: %(message)s",
    )


def main():
    _setup_logging()

    ca_bundle = _configure_tls_trust()
    if ca_bundle:
        logger.info(f"Using custom CA bundle: {ca_bundle}")

    # First run: logs in and saves tokens to ~/.garminconnect
    # Subsequent runs: loads saved tokens and auto-refreshes
    client = Garmin(
        os.getenv("GARMIN_CONNECT_EMAIL"),
        os.getenv("GARMIN_CONNECT_PASSWORD"),
        prompt_mfa=lambda: input("MFA code: "),
    )
    try:
        client.login("~/.garminconnect")
    except GarminConnectConnectionError as exc:
        message = str(exc)
        if "CERTIFICATE_VERIFY_FAILED" in message or "SSL certificate problem" in message:
            logger.error("TLS verification failed while connecting to Garmin.")
            logger.error("If you are behind a corporate proxy, export your proxy root CA and set:")
            logger.error("  GARMIN_CA_BUNDLE=/absolute/path/to/corporate-root-ca.pem")
            logger.error("Then run this script again.")
            raise SystemExit(2) from exc
        logger.exception("Garmin login failed")
        raise

    output_path, count = _export_all_surfing_activities(client)
    logger.info(f"Saved {count} surfing activities JSON to: {output_path}")


if __name__ == "__main__":
    main()
