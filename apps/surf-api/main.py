import json
import logging
from pathlib import Path

from dotenv import load_dotenv
from json_writer import write_json_to_directory
from service.garmin_activity import GarminActivityService
from service.spot_cleanup import SpotCleanupService
from settings.logging import setup_logging

# Load variables from the .env file into process environment.
load_dotenv()

logger = logging.getLogger(__name__)


def _read_json_file(file_path: Path) -> dict:
    return json.loads(file_path.read_text(encoding="utf-8"))


def main():
    setup_logging()
    data_dir = Path(__file__).resolve().parents[2] / "shared" / "data"

    garmin_activity_service = GarminActivityService.from_env()
    spots_surfed_garmin = garmin_activity_service.get_surf_activities()
    spots_surfed_manual = _read_json_file(data_dir / "manual_surfing_activities.json")

    cleanup_service = SpotCleanupService()
    spots_cleaned = cleanup_service.build_clean_spots(
        manual_payload=spots_surfed_manual,
        garmin_payload=spots_surfed_garmin,
    )

    clean_output_path = write_json_to_directory(
        spots_cleaned,
        output_dir=data_dir,
        filename="clean_surf_spots.json",
    )
    logger.info(f"Saved {spots_cleaned['count']} deduplicated surf spots JSON to: {clean_output_path}")


if __name__ == "__main__":
    main()
