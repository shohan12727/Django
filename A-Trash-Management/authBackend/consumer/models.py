from django.db import models

# Create your models here.


class Consumer(models.Model):
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=20,blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    #Meta data
    class Meta:
        ordering = ['-created_at']
        
    #string representation
    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.email})"    
    