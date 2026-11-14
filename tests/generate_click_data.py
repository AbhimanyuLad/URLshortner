import json, random, sys
from datetime import datetime, timedelta, timezone

# Usage: python generate_click_data.py uuids.txt [output.json]
# uuids.txt = one foreign key (UUID) per line
# IN_FILE = sys.argv[1] if len(sys.argv) > 1 else "uuids.txt"
# OUT_FILE = sys.argv[2] if len(sys.argv) > 2 else "click_data.json"

IN_FILE = r"D:\Somaiya MCA\Projects\urlshortner2\tests\uuids.txt"
OUT_FILE = r"D:\Somaiya MCA\Projects\urlshortner2\tests\click_data.json"
RECORDS_PER_KEY = 100
FK_FIELD = "url_id"          # <-- change to your column name

# (device, os, browsers that make sense on it)
PROFILES = [
    ("Mobile",  "Android",  ["Chrome", "Firefox", "Samsung Internet", "Opera"]),
    ("Mobile",  "iOS",      ["Safari", "Chrome", "Firefox"]),
    ("Desktop", "Windows",  ["Chrome", "Edge", "Firefox", "Opera"]),
    ("Desktop", "macOS",    ["Safari", "Chrome", "Firefox"]),
    ("Desktop", "Linux",    ["Chrome", "Firefox"]),
    ("Tablet",  "iPadOS",   ["Safari", "Chrome"]),
    ("Tablet",  "Android",  ["Chrome", "Samsung Internet"]),
]
WEIGHTS = [30, 22, 22, 10, 4, 6, 6]

def random_ip():
    # public-looking IPv4, skipping private/reserved ranges
    while True:
        a, b, c, d = random.randint(1, 223), random.randint(0, 255), random.randint(0, 255), random.randint(1, 254)
        if a in (10, 127) or (a == 172 and 16 <= b <= 31) or (a == 192 and b == 168) or (a == 169 and b == 254):
            continue
        return f"{a}.{b}.{c}.{d}"

def random_time(days=90):
    now = datetime.now(timezone.utc)
    t = now - timedelta(seconds=random.randint(0, days * 86400))
    return t.strftime("%Y-%m-%dT%H:%M:%SZ")

with open(IN_FILE) as f:
    keys = [l.strip() for l in f if l.strip()]

records = []
for k in keys:
    for _ in range(RECORDS_PER_KEY):
        device, os_, browsers = random.choices(PROFILES, weights=WEIGHTS)[0]
        records.append({
            FK_FIELD: k,
            "ip_address": random_ip(),
            "os": os_,
            "device": device,
            "browser": random.choice(browsers),
            "created_at": random_time(),
        })

records.sort(key=lambda r: (r[FK_FIELD], r["created_at"]))
with open(OUT_FILE, "w") as f:
    json.dump(records, f, indent=2)
print(f"{len(keys)} keys x {RECORDS_PER_KEY} = {len(records)} records -> {OUT_FILE}")
