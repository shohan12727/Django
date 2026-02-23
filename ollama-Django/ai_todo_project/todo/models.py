from django.db import models
import uuid
# Create your models here.

class TodoItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    title = models.CharField(max_length=255)
    description = models.TextField()
    steps = models.JSONField(default=list)
    completed = models.BooleanField(default=False)
    
    

