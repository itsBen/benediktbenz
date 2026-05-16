import logging
import os
from datetime import UTC
from datetime import datetime
from typing import Callable

from garminconnect import Garmin
from garminconnect.exceptions import GarminConnectConnectionError


logger = logging.getLogger(__name__)


class GarminSurfActivityService:
    """Service for fetching surfing activities from Garmin."""

    def __init__(
        self,
        email: str,
        password: str,
        token_store: str = "~/.garminconnect",
        mfa_prompt: Callable[[], str] | None = None,
    ) -> None:
        self.ca_bundle = self._configure_tls_trust()
        if self.ca_bundle:
            logger.info(f"Using custom CA bundle: {self.ca_bundle}")
        self.email = email
        self.password = password
        self.token_store = token_store
        self.mfa_prompt = mfa_prompt or (lambda: input("MFA code: "))

    @classmethod
    def from_env(cls) -> "GarminSurfActivityService":
        """Construct the service from environment variables."""
        email = os.getenv("GARMIN_CONNECT_EMAIL")
        password = os.getenv("GARMIN_CONNECT_PASSWORD")
        if not email or not password:
            raise ValueError(
                "GARMIN_CONNECT_EMAIL and GARMIN_CONNECT_PASSWORD must be set"
            )
        return cls(email=email, password=password)

    def _connect(self) -> Garmin:
        """Login to Garmin and return an authenticated client."""
        client = Garmin(self.email, self.password, prompt_mfa=self.mfa_prompt)
        try:
            client.login(self.token_store)
            logger.info("Garmin login successful")
            return client
        except GarminConnectConnectionError as exc:
            if self._is_tls_error(str(exc)):
                logger.error("TLS verification failed while connecting to Garmin.")
                logger.error(
                    "If you are behind a corporate proxy, set GARMIN_CA_BUNDLE to your root CA PEM file."
                )
                raise SystemExit(2) from exc
            logger.exception("Garmin login failed")
            raise

    @staticmethod
    def _is_tls_error(message: str) -> bool:
        return (
            "CERTIFICATE_VERIFY_FAILED" in message
            or "SSL certificate problem" in message
        )

    def get_surf_activities(self, page_size: int = 100) -> list[dict]:
        """Return all surfing activities from Garmin."""
        client = self._connect()
        raw_activities = self._query_surfing_activities(client, page_size=page_size)
        return self._build_payload(raw_activities)

    def _build_payload(self, surfing_activities: list[dict]) -> dict:
        """Build export payload for a set of surfing activities."""
        return {
            "exportedAt": datetime.now(UTC).isoformat(),
            "count": len(surfing_activities),
            "activities": surfing_activities,
        }


    def _configure_tls_trust(self) -> str | None:
        """Configure CA trust for Garmin API clients.

        Prefer GARMIN_CA_BUNDLE when present. This is useful on corporate
        networks where TLS traffic is inspected by a custom root certificate.
        """
        ca_bundle = os.getenv("GARMIN_CA_BUNDLE")

        if not ca_bundle:
            logger.debug("GARMIN_CA_BUNDLE is not set; using default TLS trust store")
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

        logger.info(f"Configured Garmin TLS trust bundle: {ca_bundle}")
        return ca_bundle


    def _normalize_activities(self,raw_activities: dict | list) -> list[dict]:
        """Handle API responses that may be a list or dict wrapper."""
        if isinstance(raw_activities, dict):
            activities = raw_activities.get("activities", [])
        else:
            activities = raw_activities
        return [activity for activity in activities if isinstance(activity, dict)]


    def _query_surfing_activities(self,client: Garmin, page_size: int = 100) -> list[dict]:
        """Query all surfing activities and return only requested fields."""
        start = 0
        surfing_activities: list[dict] = []

        logger.info(f"Querying Garmin activities with page_size={page_size}")

        while True:
            logger.debug(f"Fetching activities page at offset={start}")
            page = self._normalize_activities(client.get_activities(start=start, limit=page_size))
            if not page:
                logger.debug(f"No activities returned for offset={start}; stopping pagination")
                break

            for activity in page:
                type_key = activity.get("activityType", {}).get("typeKey", "")
                if "surf" not in type_key:
                    continue

                surfing_activities.append(
                    {
                        "activityId": activity.get("activityId"),
                        "startTimeGMT": activity.get("startTimeGMT"),
                        # Preserve field names as requested by downstream consumer.
                        "startLatitute": activity.get("startLatitude"),
                        "startLongitute": activity.get("startLongitude"),
                    }
                )

            start += len(page)

        logger.info(f"Collected {len(surfing_activities)} surfing activities")
        return surfing_activities
