import json
import requests
import random
import string


class Lobby:

    def __init__(self, num_users, latitude=40.712776, longitude=-74.005974, generate_suggestions=False, num_suggestions=1):
        self.lat = latitude
        self.lon = longitude
        self.num_users = num_users
        self.game_id = self.generate_room_id()
        self.suggestions = {}
        self.users = set()
        if generate_suggestions:
            url = "https://developers.zomato.com/api/v2.1/search?" + "count=" + \
                str((num_suggestions+10)) + '&lat=' + str(latitude) + \
                "&lon=" + str(longitude) + "&sort=rating&order=desc"
            headers = {
                'user-key': '9b61274b35becb3abc1e3d8906322fda',
                'Content-Type': 'application/json'
            }
            response = requests.request(
                "GET", url, headers=headers)
            restaurants = json.loads(response.text)['restaurants']
            for r in random.choices(restaurants, k=num_suggestions):
                temp = r['restaurant']['name']
                self.suggestions[temp] = 0

    def to_json(self):
        return {'lat': self.lat, 'lon': self.lon, 'num_users': self.num_users, 'game_id': self.game_id, 'suggestions': self.suggestions, 'users': list(self.users)}

    @classmethod
    def generate_room_id(cls):
        """Generate a random room ID"""
        id_length = 5
        return ''.join(random.SystemRandom().choice(
            string.ascii_uppercase) for _ in range(id_length))

    def add_user(self, uid):
        self.users.add(uid)

    def regenerate_id(self):
        self.game_id = self.generate_room_id()
