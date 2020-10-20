import json


# TEST SERVER CREATION
def test_index(app, client):
    res = client.get('/')
    assert res.status_code == 200
    expected = {'hello': 'world'}
    assert expected == json.loads(res.get_data(as_text=True))


# Test SocketIO connection
def test__client_connect(app, sclient):
    print(sclient)
    assert sclient.is_connected()
