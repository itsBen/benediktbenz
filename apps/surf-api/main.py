import logging
from pathlib import Path

from dotenv import load_dotenv
from json_writer import write_json_to_directory
from garmin_service import GarminSurfActivityService
from settings.logging import setup_logging

# Load variables from the .env file into process environment.
load_dotenv()

logger = logging.getLogger(__name__)


def main():
    setup_logging()

    service = GarminSurfActivityService.from_env()
    surf_payload = service.get_surf_activities()
    output_path = write_json_to_directory(
        surf_payload,
        output_dir=Path(__file__).resolve().parents[2] / "shared" / "data",
        filename="garmin_surfing_activities.json",
    )
    count = surf_payload["count"]
    logger.info(f"Saved {count} surfing activities JSON to: {output_path}")


if __name__ == "__main__":
    main()
