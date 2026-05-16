from django.db import models

# Create your models here.


class Product(models.Model):
    product_name = models.CharField(max_length=20)
    description = models.CharField(max_length=255, blank=True, null=True)

    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock_quantity = models.IntegerField(default=0)
    category = models.CharField(max_length=30)
    is_available = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.product_name} (${self.price})"
