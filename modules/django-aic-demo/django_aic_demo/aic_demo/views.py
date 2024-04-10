from django.http import JsonResponse

from django.views import View
import requests


class FetchArtworks(View):
    def get(self, request):
        print("Fetching data...")

        url = "https://api.artic.edu/api/v1/artworks/search"

        query = request.GET.get("q", "Monet")  # default query is Monet
        params = {"q": query}
        response = requests.get(url, params=params)

        return JsonResponse(response.json())


class FetchSingleArtwork(View):
    def get(self, request, artwork_id):
        print("Fetching data...")

        url = f"https://api.artic.edu/api/v1/artworks/{artwork_id}"
        response = requests.get(url)

        return JsonResponse(response.json())


class FetchImage(View):
    def get(self, request, image_id):
        print("Fetching data...")

        url = f"https://api.artic.edu/api/v1/artworks/{image_id}"
        response = requests.get(url)

        return JsonResponse(response.json())


# Create your views here.
