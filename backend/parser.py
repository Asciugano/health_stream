from collections import defaultdict
from datetime import datetime
import xml.etree.ElementTree as ET

def parse_health_export(file_path):
    tree = ET.parse(file_path)
    root = tree.getroot()

    results = []
    fmt = "%Y-%m-%d %H:%M:%S %z"

    for record in root.findall('Record'):
        r_type = record.attrib.get("type")
        value = float(record.attrib.get("value") or 0)
        start = record.attrib.get("startDate") or ""
        end = record.attrib.get("endDate") or ""

        metric = {"heart_rate": 0.0, "sleep_hours": 0.0, "stress_level": 0.0, "created_at": start}

        if r_type == "HKQuantityTypeIdentifierHeartRate":
            metric["heart_rate"] = value
        elif r_type == "HKCategoryTypeIdentifierSleepAnalysis":
            dt_start = datetime.strptime(start, fmt)
            dt_end = datetime.strptime(end, fmt)
            metric["sleep_hours"] = (dt_end - dt_start).total_seconds() / 3600
        elif r_type == "HKQuantityTypeIdentifierHeartRateVariabilitySDNN":
            metric["stress_level"] = value

        results.append(metric)

    return results
