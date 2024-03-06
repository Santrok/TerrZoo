from django.contrib import admin
from django.db import models

class Callback(models.Model):
    name = models.CharField(max_length=50)

