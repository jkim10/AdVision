import pytest
from app import app as flask_app, socketio


@pytest.fixture
def app():
    yield flask_app


@pytest.fixture
def client(app):
    return app.test_client()


@pytest.fixture
def sclient(app):
    return socketio.test_client(app, flask_test_client=app.test_client())
