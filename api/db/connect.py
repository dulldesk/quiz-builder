import sqlite3

# source: https://docs.python.org/3/library/sqlite3.html#sqlite3-howto-row-factory
def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

def get_connection():
    conn = sqlite3.connect('../db.sqlite3')
    conn.row_factory = dict_factory #sqlite3.Row
    return conn

