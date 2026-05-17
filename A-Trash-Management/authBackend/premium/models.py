from django.db import models

# Create your models here.


class Premium(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    is_active = models.BooleanField(default=True)
    BILLING_CYCLE_CHOICES = [
        ("monthly", "monthly"),
        ("yearly", "yearly"),
        ("lifeTime", "lifeTime"),
    ]
    billing_cycle = models.CharField(
        max_length=15, choices=BILLING_CYCLE_CHOICES, default="monthly"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Name: {self.name}"
