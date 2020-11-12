import json


# Test SocketIO connection
def test__client_connect(app, sclient):
    print(sclient)
    assert sclient.is_connected()
