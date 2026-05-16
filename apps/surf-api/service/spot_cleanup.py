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
    """
    Merge and deduplicate surf spots from manual and Garmin inputs.
    This will combine spots that are close together (based on coordinate rounding) and count visits if enabled.

    Default precision of 3 decimals ≈ ~111 meters accuracy
    """

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
        """
        Deduplicate surf spots from manual and Garmin activity data.

        :param manual_payload: The raw activities returned by the manual input
        :type manual_payload: dict
        :param garmin_payload: The raw activities returned by the Garmin API
        :type garmin_payload: dict
        :param include_visit_count: Whether to include visit count in the output
        :type include_visit_count: bool
        :return: A list of normalized activity dictionaries
        :rtype: list[dict]
        """
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
        """
        Format the cleaned surf spots for output.

        :param clean_spots: The list of cleaned surf spots
        :type clean_spots: list[dict]
        :return: A formatted dictionary containing the cleaned surf spots
        :rtype: dict
        """
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
        """
        Add a manual activity to the spots dictionary.

        :param spots_by_key: The dictionary of spots keyed by their rounded coordinates
        :type spots_by_key: dict[tuple[float, float], _SpotAggregate]
        :param activity: The manual activity to add
        :type activity: dict
        :return: None
        :rtype: None
        """
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
        """
        Add a Garmin activity to the spots dictionary.

        :param spots_by_key: The dictionary of spots keyed by their rounded coordinates
        :type spots_by_key: dict[tuple[float, float], _SpotAggregate]
        :param activity: The Garmin activity to add
        :type activity: dict
        :return: None
        :rtype: None
        """
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
        """
        Round coordinates to create a key for deduplication.
        The precision can be configured to control how close spots need to be to be considered the same.

        :param latitude: The latitude of the spot
        :type latitude: float
        :param longitude: The longitude of the spot
        :type longitude: float
        :return: A tuple representing the rounded coordinates
        :rtype: tuple[float, float]
        """
        return (
            round(float(latitude), self.coordinate_precision),
            round(float(longitude), self.coordinate_precision),
        )
