from django.db import models
from django.contrib.gis.db import models

class Sighting(models.Model):
    species = models.CharField(max_length=120)
    location = models.PointField(srid=4326) 

def __str__(self):
    return f"{self.species}"

# Create your models here.
