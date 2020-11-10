"""Object for tracking game status"""
from datetime import datetime
import time
import random
import math
import string
import yaml
import os
from paranoia import players


class Game(object):
    # pylint: disable=too-many-instance-attributes
    """Object for tracking game stats"""

    def __init__(self):
        self.date_created = datetime.now()
        self.date_modified = self.date_created
        self.players = players.Players()
        self.game_id = self.generate_room_id()

    # def to_json(self):
    #     """Serialize object to JSON"""
    #     return {
    #         "game_id": self.game_id,
    #         "starting_color": self.starting_color,
    #         "players": self.players.as_dict(),
    #         "date_created": str(self.date_created),
    #         "date_modified": str(self.date_modified),
    #         "playtime": self.playtime(),
    #         "board": self.board,
    #         "solution": self.solution,
    #         "options": {
    #             "dictionary": self.dictionary,
    #             "size": self.size,
    #             "teams": self.teams,
    #             "mix": self.mix,
    #             "custom": self.wordbank
    #         }
    #     }

    def add_player(self, name):
        """Add playername to player array"""
        self.players.append(name)

    def remove_player(self, name):
        """Remove playername to player array"""
        self.players.remove(name)

    @classmethod
    def generate_room_id(cls):
        """Generate a random room ID"""
        id_length = 5
        return ''.join(random.SystemRandom().choice(
            string.ascii_uppercase) for _ in range(id_length))

    def regenerate_id(self):
        self.game_id = self.generate_room_id()

    def playtime(self):
        # 2018-08-12 10:12:25.700528
        fmt = '%Y-%m-%d %H:%M:%S'
        d1 = self.date_created
        d2 = self.date_modified
        # Convert to Unix timestamp
        d1_ts = time.mktime(d1.timetuple())
        d2_ts = time.mktime(d2.timetuple())
        return round(float(d2_ts-d1_ts) / 60, 2)
