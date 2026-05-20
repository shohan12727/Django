from django.db import models
from author.models import AuthorModel

# Create your models here.


class PostModel(models.Model):
    author = models.ForeignKey(
        AuthorModel, on_delete=models.CASCADE, related_name="posts"
    )
    title = models.CharField(max_length=40)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title
