from flask import Flask, render_template, request
from flask_socketio import SocketIO, join_room, emit, send
from LD import lobby
from werkzeug.debug import DebuggedApplication


app = Flask(__name__)
app.debug = True
app.wsgi_app = DebuggedApplication(app.wsgi_app, evalex=True)

app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)
ROOMS = {}


@app.route('/')
def index():
    return render_template("home.html")


@app.route("/<room_id>")
def render_lobby(room_id):
    room = ROOMS[room_id]
    return render_template("lobby.html", room=room.to_json())


@app.route('/test')
def test():
    return render_template("test.html")


@socketio.on('connect')
def connected():
    print("Connected")
    return "Connected"


@socketio.on('create')
def on_create(data):
    lb = lobby.Lobby(1, num_suggestions=4, generate_suggestions=True)
    room = lb.game_id
    ROOMS[room] = lb
    currentSocketId = request.sid
    print("TESTTEST")
    print(currentSocketId)
    ROOMS[room].add_user(currentSocketId)
    join_room(room)
    emit('join_room', {'room': room})


@socketio.on('join_room')
def on_join(data):
    room = data['room']
    if room in ROOMS:
        # add player and rebroadcast game object
        # rooms[room].add_player(username)
        currentSocketId = request.sid
        print("TESTTEST")
        print(currentSocketId)
        ROOMS[room].add_user(currentSocketId)
        join_room(room)
        send(ROOMS[room].to_json(), room=room, broadcast=True)
        emit("room", {"data": ROOMS[room].to_json()}, room=room)
    else:
        emit('error', {'error': 'Unable to join room. Room does not exist.'})


# ======== Main =========== #
if __name__ == "__main__":
    socketio.run(app, debug=True)
