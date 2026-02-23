from django.db import models

# Create your models here.

class ModelItem(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    weight = models.IntegerField()
    bmi = models.IntegerField()
    age = models.IntegerField()
    
    
