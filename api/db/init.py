import sqlite3 
conn = sqlite3.connect('../db.sqlite3')

conn.execute("DROP TABLE IF EXISTS quizzes")
conn.execute("""CREATE TABLE quizzes
                (id     char(16) PRIMARY KEY  NOT NULL UNIQUE,
                 title  TEXT      NOT NULL,
                 slug   char(16)  NOT NULL UNIQUE,
                 inputs TEXT,
                 content TEXT);""")

conn.commit()
conn.close()
