from garmin_service import GarminSurfActivityService


class FakeGarminClient:
    def __init__(self, pages):
        self.pages_by_start = {}
        start = 0
        for page in pages:
            self.pages_by_start[start] = page
            start += len(page)

    def get_activities(self, start: int, limit: int):
        return self.pages_by_start.get(start, [])


class StubGarminSurfActivityService(GarminSurfActivityService):
    def __init__(self, fake_client):
        super().__init__(email="test@example.com", password="secret")
        self._fake_client = fake_client

    def _configure_tls_trust(self) -> str | None:
        return None

    def _connect(self):
        return self._fake_client


def test_normalize_activities_from_dict_wrapper():
    service = StubGarminSurfActivityService(FakeGarminClient([[]]))
    raw = {"activities": [{"activityId": 1}, {"activityId": 2}]}
    result = service._normalize_activities(raw)
    assert result == [{"activityId": 1}, {"activityId": 2}]


def test_normalize_activities_from_list_and_skip_non_dict_entries():
    service = StubGarminSurfActivityService(FakeGarminClient([[]]))
    raw = [{"activityId": 1}, "invalid", 3]
    result = service._normalize_activities(raw)
    assert result == [{"activityId": 1}]


def test_query_surfing_activities_filters_expected_fields():
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
    service = StubGarminSurfActivityService(client)

    activities = service._query_surfing_activities(client, page_size=2)

    assert activities == [
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


def test_get_surf_activities_returns_payload():
    pages = [
        [
            {
                "activityId": 201,
                "startTimeGMT": "2026-05-03 10:00:00",
                "startLatitude": 40.1,
                "startLongitude": -8.3,
                "activityType": {"typeKey": "surfing_v2"},
            }
        ],
        [],
    ]
    client = FakeGarminClient(pages)
    service = StubGarminSurfActivityService(client)

    payload = service.get_surf_activities(page_size=10)

    assert payload["count"] == 1
    assert len(payload["activities"]) == 1
    assert payload["activities"][0]["activityId"] == 201
