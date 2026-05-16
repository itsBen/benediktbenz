import json
import logging
from pathlib import Path

logger = logging.getLogger(__name__)


def write_json_to_directory(payload: dict, output_dir: Path, filename: str) -> Path:
    """Write a JSON payload to a directory and return the output path."""

    logger.debug(f"Ensuring output directory exists: {output_dir}")

    output_dir.mkdir(parents=True, exist_ok=True)
    output_path = output_dir / filename

    logger.info(f"Writing JSON payload to {output_path}")

    output_path.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    return output_path
