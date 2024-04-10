from django.db import models


class Artwork(models.Model):
    title = models.CharField(max_length=200)
    artist_title = models.CharField(max_length=200)
    place_of_origin = models.CharField(max_length=200)
    date_display = models.CharField(max_length=200)
    medium_display = models.CharField(max_length=200)
    image_id = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    iiif_url = models.URLField(null=True, blank=True)
    website_url = models.URLField(null=True, blank=True)
    license_text = models.TextField(null=True, blank=True)
    license_links = models.TextField(null=True, blank=True)
    version = (models.CharField(max_length=10, null=True, blank=True),)
    image_url = models.URLField(null=True, blank=True)


# Add other fields as needed


# Create your models here.
