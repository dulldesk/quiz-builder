from flask import Flask, request, redirect, abort
from db import connect as db
import json
from os import urandom
import sqlite3

# temp
import secrets
from base64 import b64decode
secret = secrets.token_urlsafe(32)

app = Flask(__name__)
app.secret_key = secret


@app.route('/')
def home():
    return {}

@app.route('/get/<slug>')
def get_quiz(slug):
    conn = db.get_connection()
    try:
        cur = conn.cursor()
        cur.execute("SELECT title,content,slug,inputs FROM quizzes WHERE slug = ?", (slug,))
        data = cur.fetchall()
        conn.close()
        if data: data[0]["inputs"] = b64decode(data[0]["inputs"]).decode('utf-8')
        return data
    except sqlite3.Error as e:
        conn.close()
        return {"error": e}, 400

@app.route('/check-slug-qid/')
def check_slug_qid():
    qid = request.values['qid']
    slug = request.values['slug']

    conn = db.get_connection()
    try:
        cur = conn.cursor()
        cur.execute("SELECT slug FROM quizzes WHERE id = ?", (qid,))
        data = cur.fetchall()
        conn.close()
        return "1" if data and data[0]['slug'] == slug else "0"
    except sqlite3.Error as e:
        conn.close()
        return e, 400


@app.route('/update', methods=['POST'])
def update_quiz():
    title = request.form['title']
    content = request.form['content']
    slug = request.form['slug']
    qid = request.form['qid']
    inputs_data = request.form['inputs']

    conn = db.get_connection()
    try:
        conn.execute("UPDATE quizzes SET title = ?, content = ?, inputs = ? WHERE id = ?",
                        (title, content, inputs_data, qid))
        conn.commit()
        conn.close()
        return get_quiz(slug)
    except sqlite3.Error as e:
        conn.close()
        return {"error": e}, 400


@app.route('/create', methods=['POST'])
def create_quiz():
    print(request.form)
    title = request.form['title']
    content = request.form['content']
    slug = request.form['slug']
    inputs_data = request.form['inputs']
    qid = urandom(8).hex()

    if not title or title == "":
        return {"error": "Title is required"}, 400
    elif not slug or slug == "":
        return {"error": "Slug is required"}, 400

    conn = db.get_connection()
    try:
        conn.execute("INSERT INTO quizzes (id,title,content,slug,inputs) VALUES(?,?,?,?,?)", (qid,title,content,slug, inputs_data))
        conn.commit()
        conn.close()
        return {"id": qid}
    except sqlite3.Error as e:
        conn.close()
        return {"error": e.args[0]}, 400
