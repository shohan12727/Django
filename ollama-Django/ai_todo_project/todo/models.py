from django.db import models
import uuid
from typing import List
from pydantic import BaseModel, Field
# Create your models here.

class TodoItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    title = models.CharField(max_length=255)
    description = models.TextField()
    steps = models.JSONField(default=list)
    completed = models.BooleanField(default=False)
    
    
class AITodoItemSteps(BaseModel):
    steps: List[str] = Field([], description = "This steps which need to be taken to complete the todo item")
