from flask import Flask, request, jsonify, json, abort, make_response, g
import mysql.connector as mysql
from datetime import datetime
import uuid
import bcrypt
import mysql.connector, mysql.connector.pooling

pool = mysql.connector.pooling.MySQLConnectionPool(
    pool_name="pool",
    host="myrds.c94pitaorldi.us-east-1.rds.amazonaws.com",
    user="admin",
    port=3306,
    passwd="n------14",
    database="nadav_database",
    buffered=True,
    pool_size=3
)

app = Flask(__name__,
            static_folder='/home/ubuntu/build',
            static_url_path='/')


@app.before_request
def before_request():
    g.db = pool.get_connection()


@app.teardown_request
def teardown_request(exception):
    g.db.close()


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/api/alive')
def api_alive():
    return "alive"


################## REQUESTS AND FUNCTIONS ############

@app.route('/postss/<key>', methods=['GET', ])
def get_posts_by_key(key):
    value = "'" + str(key) + "'"
    query = "select id,title,content,author,published from posts where content REGEXP " + str(value)
    value = "'" + str(key) + "'"
    data = []
    cursor = g.db.cursor()
    cursor.execute(query, value)
    records = cursor.fetchall()
    header = ['id', 'title', 'content', 'author', 'published']
    if not records:
        return "no posts"
    for r in records:
        data.append(dict(zip(header, r)))
    cursor.close()
    return json.dumps(data, default=str)


@app.route('/posts', methods=['GET', 'POST'])
def manage_requests():
    if request.method == 'GET':
        return get_all_posts()
    if request.method == 'POST':
        return add_post()


def get_all_posts():
    query = "select id,title,content,author,published,counter from posts"
    data = []
    cursor = g.db.cursor()
    cursor.execute(query)
    records = cursor.fetchall()
    header = ['id', 'title', 'content', 'author', 'published', 'counter']
    if not records:
        return "no posts"
    for r in records:
        data.append(dict(zip(header, r)))
    cursor.close()
    return json.dumps(data, default=str)


def add_post():
    now = datetime.now()
    full_time = now.strftime("%d/%m/%Y %H:%M:%S")
    data = request.get_json()
    query = "insert into posts (title, content, author, published) values (%s, %s, %s, %s)"
    values = (data['title'], data['content'], data['author'], full_time)
    cursor = g.db.cursor()
    cursor.execute(query, values)
    g.db.commit()
    new_post_id = cursor.lastrowid
    cursor.close()

    return 'New post added. id: ' + str(new_post_id)


@app.route('/post', methods=['POST', 'PUT'])
def manage_id_requests():
    data = request.get_json()
    id = data['post_id']
    if request.method == 'POST':
        return get_post_by_ID(id)
    if request.method == 'PUT':
        return edit_post(id)

# delete method fix
@app.route('/delete', methods=['POST'])
def delete():
    data = request.get_json()
    id = data['post_id']
    query = "delete  from posts where id = %s"
    values = (id,)
    cursor = g.db.cursor()
    cursor.execute(query, values)
    g.db.commit()
    post_edit_id = cursor.lastrowid
    cursor.close()

    return 'post id: ' + str(post_edit_id) + "Deleted succesfully"


def get_post_by_ID(id):
    query = "select id,title,content,author, published, counter from posts where id=%s"
    values = (id,)
    cursor = g.db.cursor()
    cursor.execute(query, values)
    records = cursor.fetchall()
    header = ['id', 'title', 'content', 'author', 'published', 'counter']
    cursor.close()

    return json.dumps(dict(zip(header, records[0])), default=str)


def edit_post(id):
    now = datetime.now()
    full_time = now.strftime("%d/%m/%Y %H:%M:%S")
    data = request.get_json()
    query = "update posts set title=%s, content=%s, published=%s where id=%s"
    values = (data['title'], data['content'], full_time, id)
    cursor = g.db.cursor()
    cursor.execute(query, values)
    g.db.commit()
    post_edit_id = cursor.lastrowid
    cursor.close()

    return 'post id: ' + str(post_edit_id) + "Edited successfully"


@app.route('/login', methods=['GET', 'POST'])
def manage_login_requests():
    if request.method == 'GET':
        return get_username()
    if request.method == 'POST':
        return login()


def get_username():
    session_id = request.cookies.get('session_id')
    query = "select userId from sessions where sessionId = %s"
    values = (session_id,)
    cursor = g.db.cursor()
    cursor.execute(query, values)
    g.db.commit()
    user_id = cursor.fetchone()

    query = "select userName from users where id =%s"
    values = str(user_id)
    cursor = g.db.cursor()
    cursor.execute(query, values)
    g.db.commit()
    username = cursor.fetchone()

    return str(username)


def login():
    data = request.get_json()
    query = "select id, pass from users where username = %s"
    values = (data['username'],)
    cursor = g.db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchone()
    if not record and data['googlesign'] == 'true':
        return google_sign_up(data['fullname'], data['username'], data['password'])
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
    g.db.commit()
    response = make_response()
    response.set_cookie("Session_id", session_id)
    # my_dict = {'userid': user_id, 'response': response}

    return str(user_id)


# def google_sign_up(fullname,username,password):
# hashed_pass = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
# query = 'insert into users (fullName, userName, pass) values (%s, %s, %s)'
# values = (fullname, username, password)
# cursor = g.db.cursor()
# ursor.execute(query, values)
# g.db.commit()
# cursor.close()
# return "google_sign_up"

@app.route('/signup', methods=['POST'])
def sign_up():
    data = request.get_json()
    if userExists(data['username']):
        return abort(409)

    hashed_pass = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
    query = 'insert into users (fullName, userName, pass,email) values (%s, %s, %s,%s)'
    values = (data['fullname'], data['username'], hashed_pass, data['email'])
    cursor = g.db.cursor()
    cursor.execute(query, values)
    g.db.commit()
    cursor.close()
    return {'Message': data['username'] + 'signup successfully'}


def userExists(username):
    ans = False
    query = 'select userName from users where userName=%s'
    values = (username,)
    cursor = g.db.cursor()
    cursor.execute(query, values)
    user_record = cursor.fetchone()
    cursor.close()
    if user_record:
        ans = True
    return ans


def authenticate(username, id):
    query = "select username from users where id=%s"
    values = (id,)
    cursor = g.db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchone()
    if not record:
        cursor.close()
        abort(401)
    if record[0] != username:
        cursor.close()
        abort(403)
    cursor.close()
    return True


@app.route('/logout', methods=['POST'])
def logout():
    data = request.get_json()
    if authenticate(data['username'], data['userId']):
        session_id = request.cookies.get('session_id')
        query = "delete from sessions where userId=%s"
        values = (session_id,)
        cursor = g.db.cursor()
        cursor.execute(query, values)
        g.db.commit()
        return "Success!"
    return "Failed!"


@app.route('/comment', methods=['PUT', 'POST'])
def manage_comment_requests():
    data = request.get_json()
    id = data['post_id']
    if request.method == 'PUT':
        return get_all_comments(id)
    else:
        data = request.get_json()
        return add_comment(data)


def add_comment(data):
    now = datetime.now()
    full_time = now.strftime("%d/%m/%Y %H:%M:%S")
    query = "insert into comments (username, content, postid, published) values (%s, %s, %s, %s)"
    values = (data['username'], data['content'], data['post_id'], full_time)

    cursor = g.db.cursor()
    cursor.execute(query, values)
    g.db.commit()
    new_comment_id = cursor.lastrowid
    cursor.close()

    return 'New comment added id: ' + str(new_comment_id)


def get_all_comments(id):
    query = "select id,username,content,published from comments where postid=%s"
    values = (id,)
    data = []
    cursor = g.db.cursor()
    cursor.execute(query, values)
    records = cursor.fetchall()
    header = ['id', 'username', 'content', 'published']
    for r in records:
        data.append(dict(zip(header, r)))
    cursor.close()

    return json.dumps(data, default=str)


@app.route('/counter/<id>', methods=['PUT'])
def post_counter(id):
    query = "update posts set counter=counter+%s where id=%s"
    values = ("1", id)
    cursor = g.db.cursor()
    cursor.execute(query, values)
    g.db.commit()
    cursor.close()


@app.route('/popular', methods=['GET'])
def popular_posts_id():
    query = "SELECT id FROM posts ORDER BY counter DESC LIMIT 5"
    data = []
    cursor = g.db.cursor()
    cursor.execute(query)
    records = cursor.fetchall()
    if not records:
        return "no posts"

    for r in records:
        data.append(r)

    cursor.close()
    return json.dumps(records)


@app.route('/forgot/<id>', methods=['GET'])
def checkUser(id):
    query = "select id from users where email =%s"
    values = (id,)
    cursor = g.db.cursor()
    cursor.execute(query, values)
    g.db.commit()
    username = cursor.fetchone()
    if not username:
        return "no such user"
    return "user exist"


@app.route('/reset', methods=['POST'])
def func():
    data = request.get_json()
    query = 'insert into resets (email, uuid) values (%s, %s)'
    values = (data['email'], data['uuid'])
    cursor = g.db.cursor()
    cursor.execute(query, values)
    g.db.commit()
    cursor.close()
    return 'resets successfully'


@app.route('/reset/<id>', methods=['POST'])
def changePassword(id):
    data = request.get_json()
    query = "select email from resets where uuid =%s"
    values = (id,)
    cursor = g.db.cursor()
    cursor.execute(query, values)
    email = cursor.fetchone()
    if not email[0]: return "Link expired"
    g.db.commit()
    hashed_pass = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
    query = "update users set pass=%s where email =%s"
    values = (hashed_pass, email[0])
    cursor = g.db.cursor()
    cursor.execute(query, values)
    g.db.commit()
    cursor.close()

    query = "delete  from resets where uuid = %s"
    values = (id,)
    cursor = g.db.cursor()
    cursor.execute(query, values)
    g.db.commit()
    cursor.close()

    return index()


if __name__ == "__main__":
    app.run()
