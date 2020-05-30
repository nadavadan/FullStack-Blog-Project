from flask import Flask, request, jsonify
import mysql.connector as mysql
import json

db = mysql.connect(
    host="localhost",
    user="root",
    passwd="my_password",
    database="nadav_database"
)

print(db)

app = Flask(__name__)


@app.route('/posts', methods=['GET', 'POST'])
def manage_requests():
    if request.method == 'GET':
        return get_all_posts()
    else:
        return add_post()


def add_post():
    data = request.get_json()
    query = "insert into posts (title, content, author) values (%s, %s, %s)"
    values = (data['title'], data['content'], data['author'])
    cursor = db.cursor()
    cursor.execute(query, values)
    db.commit()
    new_post_id = cursor.lastrowid
    cursor.close()
    return 'New post id: ' + str(new_post_id)


def get_all_posts():
    query = "select * from posts"
    data = []
    cursor = db.cursor()
    cursor.execute(query)
    records = cursor.fetchall()
    header = ['id', 'title', 'content', 'author', 'published_at']
    for r in records:
        data.append(dict(zip(header, r)))
    cursor.close()
    return json.dumps(data, default=str)


@app.route('/posts/<id>')
def get_post_by_ID(id):
    query = "select * from posts where id=" + str(id)
    data = []
    cursor = db.cursor()
    cursor.execute(query)
    records = cursor.fetchall()
    header = ['id', 'title', 'content', 'author', 'published_at']
    cursor.close()
    return json.dumps(dict(zip(header, records[0])), default=str)


if __name__ == "__main__":
    app.run()