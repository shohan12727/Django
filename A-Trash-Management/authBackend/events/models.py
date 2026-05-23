from django.db import models
from django.contrib.auth import get_user_model
from django.utils.text import slugify

User = get_user_model()


class EventCategory(models.Model):
    name = models.CharField(unique=True,max_length=100)
    
    class Meta:
        verbose_name_plural = "Event Categories"
        
    
    def __str__(self):
        return self.name    
    
class EventTag(models.Model):
    
    name = models.CharField(max_length=50,unique=True)
    
    def __str__(self):
        return self.name
     
class Events(models.Model):
         
    STATUS_CHOICES = (
        ("draft", "Draft"),
        ("upcoming", "Upcoming"),
        ("running", "Running"),
        ("completed", "Completed"),
        ("cancelled", "Cancelled"),
    )

    EVENT_TYPE_CHOICES = (
        ("online", "Online"),
        ("offline", "Offline"),
        ("hybrid", "Hybrid"),
    )
    
    title = models.CharField(max_length=78)
    slug = models.SlugField(unique=True,blank=True)
    
    description = models.TextField()
    
    banner = models.ImageField(
        upload_to="events/banner/",
        blank=True,
        null=True
    )
    
    category = models.ForeignKey(
        EventCategory,
        on_delete=models.SET_NULL,
        null=True,
        related_name="events"
    )
    
    tags = models.ManyToManyField(
        EventTag,
        blank=True,
        related_name="events"
    )
    
    organizer = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="organized_events"
    )
    
    event_type = models.CharField(
        max_length=20,
        choices=EVENT_TYPE_CHOICES,
        default="offline"
    )
    location = models.CharField(max_length=200)
    
    max_participants = models.PositiveIntegerField()
    
    registration_deadline = models.DateTimeField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    is_public = models.BooleanField(default=True)
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="draft"
        
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ["-created_at"]
        
    def save (self, *args,**kwargs):
        
        if not self.slug:
            self.slug = slugify(self.title)
            
        super().save(*args,**kwargs)    
        
        
    def __str__(self):
        return self.title        
    
class EventRegistration(models.Model):


    STATUS_CHOICES = (
        ("registered", "Registered"),
        ("cancelled", "Cancelled"),
        ("attended", "Attended"),
    )
    
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="events_registrations"
    )
    
    event = models.ForeignKey(
        Events,
        on_delete=models.CASCADE,
        related_name="registrations"        
    )
    status = models.CharField(
        max_length=20,
        choices= STATUS_CHOICES
    )
    
    registration_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ["user","event"]
        
    def __str__(self):
        return f"{self.user} --> {self.event}"    
    
class EventFeedback(models.Model):
    
    user = models.ForeignKey(
        User,
        on_delete= models.CASCADE,
        related_name="event_feedbacks" 
    )    
    event= models.ForeignKey(
        Events,
        on_delete=models.CASCADE,
        related_name="feedbacks"
        
    )
    rating = models.PositiveIntegerField()
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ["user","event"]
    
    def __str__(self):
        return f"{self.user} rated {self.event}"    