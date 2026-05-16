# surf-api

Python script that logs into Garmin Connect, pulls all surfing activities, merges them with a manual spot list, deduplicates by location, and writes a clean JSON file for the website to consume.

## Features

- Fetches surfing activities from Garmin Connect via [python-garminconnect](https://github.com/cyberjunky/python-garminconnect/)
- Reads a manual spot list from `shared/data/manual_surfing_activities.json`
- Merges and deduplicates both sources by rounding coordinates to 2 decimal places (~1.1 km radius)
- Writes the result to `shared/data/visited_surf_spots.json` with a UTC timestamp

## Tech Stack

- **Runtime:** Python 3.12+, uv
- **Garmin integration:** python-garminconnect
- **Config:** python-dotenv
- **Testing:** pytest

## Getting Started

```bash
uv sync
```

Copy `.env.example` to `.env` and fill in your credentials:

```bash
GARMIN_CONNECT_EMAIL=you@example.com
GARMIN_CONNECT_PASSWORD=yourpassword
```

Then run:

```bash
uv run main.py
```

## Configuration

| Variable                        | Required | Description                                               |
| ------------------------------- | -------- | --------------------------------------------------------- |
| `GARMIN_CONNECT_EMAIL`          | Yes      | Garmin Connect account email                              |
| `GARMIN_CONNECT_PASSWORD`       | Yes      | Garmin Connect account password                           |
| `GARMIN_CA_BUNDLE`              | No       | Path to CA bundle for corporate TLS interception          |
| `INCLUDE_SURF_SPOT_VISIT_COUNT` | No       | Include per-spot visit counts in output (default: `true`) |

## Tests

```bash
uv run pytest
```

## Output Format

```json
{
  "count": 14,
  "includeVisitCount": true,
  "timestampUtcExtractedAt": "2026-05-16T16:41:39.987093+00:00",
  "spots": [
    {
      "name": "Anchor Point",
      "latitude": 30.544,
      "longitude": -9.712
    }
  ]
}
```
