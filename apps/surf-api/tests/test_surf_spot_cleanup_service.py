from service.spot_cleanup import SpotCleanupService


def test_build_clean_spots_deduplicates_manual_and_garmin_locations():
    manual_payload = {"activities": [{"name": "Weligama SK Town", "latitude": 5.973, "longitude": 80.4302}]}
    garmin_payload = {
        "activities": [
            {
                "activityId": 1,
                "startLatitute": 5.9731,
                "startLongitute": 80.43018,
            },
            {
                "activityId": 2,
                "startLatitute": 5.97295,
                "startLongitute": 80.43019,
            },
        ]
    }

    service = SpotCleanupService(coordinate_precision=3)
    spots = service.build_clean_spots(
        manual_spots=manual_payload,
        garmin_spots=garmin_payload,
        include_visit_count=True,
    )

    assert spots["count"] == 1
    assert spots["includeVisitCount"] is True
    assert spots["spots"][0]["name"] == "Weligama SK Town"
    assert spots["spots"][0]["visitCount"] == 3


def test_build_clean_spots_skips_garmin_activities_without_coordinates():
    manual_payload = {"activities": []}
    garmin_payload = {
        "activities": [
            {"activityId": 1, "startLatitute": None, "startLongitute": None},
            {"activityId": 2, "startLatitute": 39.36, "startLongitute": -9.36},
        ]
    }

    service = SpotCleanupService()
    spots = service.build_clean_spots(
        manual_spots=manual_payload,
        garmin_spots=garmin_payload,
        include_visit_count=False,
    )

    assert spots["count"] == 1
    assert spots["includeVisitCount"] is False
    assert "visitCount" not in spots["spots"][0]


def test_build_clean_spots_includes_count_only_when_enabled():
    manual_payload = {"activities": [{"name": "Anchor Point", "latitude": 30.544, "longitude": -9.712}]}
    garmin_payload = {"activities": []}

    service = SpotCleanupService()
    without_count = service.build_clean_spots(
        manual_spots=manual_payload,
        garmin_spots=garmin_payload,
        include_visit_count=False,
    )
    with_count = service.build_clean_spots(
        manual_spots=manual_payload,
        garmin_spots=garmin_payload,
        include_visit_count=True,
    )

    assert without_count["includeVisitCount"] is False
    assert with_count["includeVisitCount"] is True
    assert "visitCount" not in without_count["spots"][0]
    assert with_count["spots"][0]["visitCount"] == 1
