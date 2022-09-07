import json
import sqlite3
from sys import api_version

dbName = "../server/drug.db"
fileName = "results.json"

f = open(fileName)
data = json.load(f)
f.close()

db = sqlite3.connect(dbName)
cur = db.cursor()

notFoundList = []

for d in data["results"]:
    if(not d["found"]):
        notFoundList.append(d["name"])
        continue
    cur.execute("INSERT INTO drugs(name, secondName, category) VALUES(?, ?, ?)", (d["name"], d["secondName"], d["category"]))
    db.commit()

print(notFoundList)