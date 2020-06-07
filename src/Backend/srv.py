from flask import Flask, request, jsonify, json, abort, make_response
import mysql.connector as mysql
import uuid
import bcrypt

db = mysql.connect(
    host="localhost",
    user="root",
    passwd="MyPass",
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

    return 'New post added. id: ' + str(new_post_id)


def get_all_posts():
    query = "select id,title,content,author from posts"
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
    query = "select * from posts where id= %s"
    values = (id,)
    data = []
    cursor = db.cursor()
    cursor.execute(query, values)
    records = cursor.fetchall()
    header = ['id', 'title', 'content', 'author', 'published_at']
    cursor.close()

    return json.dumps(dict(zip(header, records[0])), default=str)


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    query = "select id, pass from users where username = %s"
    values = (data['username'],)
    cursor = db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchone()
    if not record:
        abort(401)

    user_id = record[0]
    user_pass = record[1]
    hashed_pass = user_pass.encode('utf-8')
    if bcrypt.hashpw(data['password'].encode('utf-8'), hashed_pass) != hashed_pass:
        abort(401)

    session_id = str(uuid.uuid4())
    query = "insert into sessions (userId,sessionId) values (%s,%s) on duplicate key update sessionId=%s"
    values = (user_id, session_id, session_id)
    cursor.execute(query, values)
    db.commit()
    response = make_response()
    response.set_cookie("Session_id", session_id)

    return response


@app.route('/signup', methods=['POST'])
def sign_up():
    data = request.get_json()

    if isUser(data['username']):
        return abort(409)

    hashed_pass = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
    query = 'insert into users (fullName, userName, pass) values (%s, %s, %s)'
    values = (data['fullname'], data['username'], hashed_pass)
    cursor = db.cursor()
    cursor.execute(query, values)
    db.commit()
    cursor.close()
    return {'Message': data['username'] + 'signup successfully'}


def isUser(username):
    query = 'select userName from users where userName=%s'
    values = (username,)
    cursor = db.cursor()
    cursor.execute(query, values)
    user_record = cursor.fetchone()
    cursor.close()
    if user_record:
        return True


@app.route('/logout', methods=['POST'])
def logout():
    session_id = request.cookies.get('session_id')
    query = "delete from sessions where userId = %s"
    values = (session_id,)
    cursor = db.cursor()
    cursor.execute(query, values)
    db.commit()
    response = make_response()
    response.set_cookie('session_id', '')

    return response


if __name__ == "__main__":
    app.run()
