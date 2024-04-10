from django.urls import path
from .views import FetchArtworks
from .views import FetchSingleArtwork

urlpatterns = [
    path("fetch_artworks/", FetchArtworks.as_view(), name="fetch_artworks"),
    path(
        "fetch_single_artwork/<int:artwork_id>/",
        FetchSingleArtwork.as_view(),
        name="fetch_single_artwork",
    ),
    # other url patterns...
]
