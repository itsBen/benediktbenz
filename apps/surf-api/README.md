## surf-api

Small Python script that logs into Garmin Connect and exports all surfing activities to JSON.

The export is written to `data/garmin_surfing_activities.json` and includes these fields per activity:

- `activityId`
- `startTimeGMT`
- `startLatitute`
- `startLongitute`

Required environment variables:

- `GARMIN_CONNECT_EMAIL`
- `GARMIN_CONNECT_PASSWORD`

Optional for corporate TLS interception:

- `GARMIN_CA_BUNDLE`

Run:

```bash
python3 main.py
```

## Credits

- This project uses the external Python package [python-garminconnect](https://github.com/cyberjunky/python-garminconnect/).
