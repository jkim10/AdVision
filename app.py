from flask import Flask, jsonify, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)


@app.route('/')
def index():
    return jsonify({'hello': 'world'})


@app.route('/test')
def test():
    return render_template("test.html")


@socketio.on('connect')
def connected():
    print("Connected")
    return "Connected"


@socketio.on('my_event')
def test_message(message):
    emit('my_response',
         {'data': message['data']})
    return message['data']


# ======== Main =========== #
if __name__ == "__main__":
    socketio.run(app)
