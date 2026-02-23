from django.db import models

# Create your models here.

class ModelItem(models.Model):
    name = models.CharField(max_length=255)
    price = models.IntegerField()
    
class Reservation(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    guest_time = models.IntegerField()
    reservation_time = models.DateField(auto_now=True)
    comment = models.CharField(max_length=1000)
        


