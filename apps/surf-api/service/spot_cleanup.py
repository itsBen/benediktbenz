from __future__ import annotations

import os
from dataclasses import dataclass


@dataclass
class _SpotAggregate:
    name: str
    latitude: float
    longitude: float
    visit_count: int = 0


class SpotCleanupService:
    """Merge and deduplicate surf spots from manual and Garmin inputs."""

    def __init__(self, coordinate_precision: int = 3) -> None:
        self.coordinate_precision = coordinate_precision
        self.include_visit_count = os.getenv("INCLUDE_SURF_SPOT_VISIT_COUNT", "true").lower() in {
            "1",
            "true",
            "yes",
        }

    def build_clean_spots(
        self,
        manual_payload: dict,
        garmin_payload: dict,
        include_visit_count: bool = False,
    ) -> list[dict]:
        spots_by_key: dict[tuple[float, float], _SpotAggregate] = {}

        for activity in manual_payload.get("activities", []):
            self._add_manual_activity(spots_by_key, activity)

        for activity in garmin_payload.get("activities", []):
            self._add_garmin_activity(spots_by_key, activity)

        clean_spots: list[dict] = []
        for spot in spots_by_key.values():
            clean_spot = {
                "name": spot.name,
                "latitude": spot.latitude,
                "longitude": spot.longitude,
            }
            if include_visit_count:
                clean_spot["visitCount"] = spot.visit_count
            clean_spots.append(clean_spot)

        clean_spots.sort(key=lambda spot: (spot["name"].lower(), spot["latitude"], spot["longitude"]))

        return self._format_output(clean_spots)

    def _format_output(self, clean_spots: list[dict]) -> list[dict]:

        formatted_output = {
            "count": len(clean_spots),
            "includeVisitCount": self.include_visit_count,
            "spots": clean_spots,
        }

        return formatted_output

    def _add_manual_activity(
        self,
        spots_by_key: dict[tuple[float, float], _SpotAggregate],
        activity: dict,
    ) -> None:
        latitude = activity.get("latitude")
        longitude = activity.get("longitude")
        name = activity.get("name")

        if not isinstance(name, str) or latitude is None or longitude is None:
            return

        key = self._spot_key(latitude, longitude)
        spot = spots_by_key.get(key)
        if spot is None:
            spots_by_key[key] = _SpotAggregate(
                name=name,
                latitude=float(latitude),
                longitude=float(longitude),
                visit_count=1,
            )
            return

        spot.visit_count += 1

    def _add_garmin_activity(
        self,
        spots_by_key: dict[tuple[float, float], _SpotAggregate],
        activity: dict,
    ) -> None:
        latitude = activity.get("startLatitute")
        longitude = activity.get("startLongitute")

        if latitude is None or longitude is None:
            return

        key = self._spot_key(latitude, longitude)
        spot = spots_by_key.get(key)
        if spot is None:
            spots_by_key[key] = _SpotAggregate(
                name=f"Spot {key[0]:.3f}, {key[1]:.3f}",
                latitude=float(latitude),
                longitude=float(longitude),
                visit_count=1,
            )
            return

        spot.visit_count += 1

    def _spot_key(self, latitude: float, longitude: float) -> tuple[float, float]:
        return (
            round(float(latitude), self.coordinate_precision),
            round(float(longitude), self.coordinate_precision),
        )
