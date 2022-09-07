import sqlite3

dbName = "../server/drug.db"

db = sqlite3.connect(dbName)
cur = db.cursor()

#cur.execute("INSERT INTO games(game, round) VALUES(?, ?)", ("struct", 0))
cur.execute("INSERT INTO results VALUES(?, ?, ?, ?)", ("struct", 0, 1, 0))
db.commit()
