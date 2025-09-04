from collections import defaultdict
from datetime import datetime
import xml.etree.ElementTree as ET

def parse_health_export(file_path):
    tree = ET.parse(file_path)
    root = tree.getroot()

    daily_data = defaultdict(lambda: {"heart_rate": 0.0, "sleep_hour": 0.0, "stress_level": 0.0})

    fmt = "%Y-%m-%d %H:%M:%S %z"

    for record in root.findall('Record'):
        r_type = record.attrib.get("type")
        value = record.attrib.get("value")
        start = record.attrib.get("startDate")
        end = record.attrib.get("endDate")

        day = datetime.now()

        if r_type == "HKQuantityTypeIdentifierHeartRate":
            daily_data[day]["heart_rate"] = (float(value or 0))
        elif r_type == "HKQuantityTypeIdentifierSleepAnalysis":
            dt_start = datetime.strptime(start or "", fmt)
            dt_end = datetime.strptime(end or "", fmt)
            hours = (dt_end - dt_start).total_seconds() / 3600
            daily_data[day]["sleep_hours"] += hours
        elif r_type == "HKQuantityTypeIdentifierHeartRateVariabilitySDNN":
            daily_data[day]["stress_level"] = float(value or 0)

    results = []
    for day, vals in daily_data.items():
        hr = vals["heart_rate"] / vals["heart_rate"] if vals["heart_rate"] else 0
        sl = vals["sleep_hours"]
        st = vals["stress_level"] / vals["stress_level"] if vals["stress_level"] else 0

        results.append({
            "created_at": str(day),
            "heart_rate": hr,
            "sleep_hours": sl,
            "stress_level": st,
        })

    return results
