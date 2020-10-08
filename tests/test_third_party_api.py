from googleplaces import GooglePlaces, types, lang
from serpapi import GoogleSearchResults

YOUR_API_KEY = "AIzaSyDGgcdfAZod0ceOtHO_cO_-GAdd_8aSzW8"


def test_google_places_api():
    google_places = GooglePlaces(YOUR_API_KEY)
    query_result = google_places.nearby_search(
        location='London, England', keyword='Fish and Chips',
        radius=20000, types=[types.TYPE_FOOD])
    assert len(query_result.places) > 0


def test_google_image_api():
    client = GoogleSearchResults(
        {"q": "coffee", "location": "Austin,Texas", "api_key": YOUR_API_KEY})
    result = client.get_dict()
    assert len(result) > 0
