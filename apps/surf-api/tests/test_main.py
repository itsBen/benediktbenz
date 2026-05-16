import json
from pathlib import Path

from main import _normalize_activities, export_all_surfing_activities


class FakeGarminClient:
    def __init__(self, pages):
        self.pages_by_start = {}
        start = 0
        for page in pages:
            self.pages_by_start[start] = page
            start += len(page)

    def get_activities(self, start: int, limit: int):
        return self.pages_by_start.get(start, [])


def test_normalize_activities_from_dict_wrapper():
    raw = {"activities": [{"activityId": 1}, {"activityId": 2}]}
    result = _normalize_activities(raw)
    assert result == [{"activityId": 1}, {"activityId": 2}]


def test_normalize_activities_from_list_and_skip_non_dict_entries():
    raw = [{"activityId": 1}, "invalid", 3]
    result = _normalize_activities(raw)
    assert result == [{"activityId": 1}]


def test_export_all_surfing_activities_filters_and_writes_output(tmp_path: Path):
    pages = [
        [
            {
                "activityId": 101,
                "startTimeGMT": "2026-05-01 10:00:00",
                "startLatitude": 39.1,
                "startLongitude": -9.3,
                "activityType": {"typeKey": "surfing_v2"},
            },
            {
                "activityId": 102,
                "startTimeGMT": "2026-05-01 12:00:00",
                "startLatitude": 39.2,
                "startLongitude": -9.4,
                "activityType": {"typeKey": "yoga"},
            },
        ],
        [
            {
                "activityId": 103,
                "startTimeGMT": "2026-05-02 09:00:00",
                "startLatitude": 39.3,
                "startLongitude": -9.5,
                "activityType": {"typeKey": "surfing_v2"},
            }
        ],
        [],
    ]
    client = FakeGarminClient(pages)

    output_path, count = export_all_surfing_activities(client, page_size=2, output_dir=tmp_path)

    assert count == 2
    assert output_path.exists()

    payload = json.loads(output_path.read_text(encoding="utf-8"))
    assert payload["count"] == 2
    assert payload["activities"] == [
        {
            "activityId": 101,
            "startTimeGMT": "2026-05-01 10:00:00",
            "startLatitute": 39.1,
            "startLongitute": -9.3,
        },
        {
            "activityId": 103,
            "startTimeGMT": "2026-05-02 09:00:00",
            "startLatitute": 39.3,
            "startLongitute": -9.5,
        },
    ]
