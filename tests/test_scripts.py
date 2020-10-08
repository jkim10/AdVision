import os
import pathlib
import pytest

from scripts.ranking import generateRanking


def test_ranking_1_output():
    dummy = {
        "Amy": ["Harry Potter", "Pokemon"],
        "Bob": ["Harry Potter", "Star Wars"]
    }
    dummy2 = {
        "Amy": ["Harry Potter", "Pokemon"],
        "Bob": ["Pokemon", "Star Wars"]
    }
    result = generateRanking(dummy, 1)
    assert result == "Harry Potter"
    result2 = generateRanking(dummy2, 1)
    assert result2 != "Harry Potter"
    assert result2 == "Pokemon"
