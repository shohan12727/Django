from django.db import models

# Create your models here.


class Product(models.Model):
    title = models.CharField(max_length=255)  # varchar(255)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    inventory = models.IntegerField()
    last_update = models.DateTimeField(auto_now=True)


class Customer(models.Model):
    MEMEBERSHIP_BRONZE = "B"
    MEMEBERSHIP_CHOICES = [
        (MEMEBERSHIP_BRONZE, "Bronze"),
        ("S", "Silver"),
        ("G", "Gold"),
    ]
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20)
    birth_date = models.DateField(null=False, blank=False)
    membership = models.CharField(
        max_length=1, choices=MEMEBERSHIP_CHOICES, default=MEMEBERSHIP_BRONZE
    )


class Order(models.Model):
    PAYMENT_STATUS_PENDING = "P"
    PAYMENT_STATUS_COMPLETE = "C"
    PAYMENT_STATUS_FAILED = "F"
    PAYMENT_STATUS_CHOICES = [
        (PAYMENT_STATUS_PENDING, "Pending"),
        (PAYMENT_STATUS_COMPLETE, "Complete"),
        (PAYMENT_STATUS_FAILED, "Failed"),
    ]
    place_at = models.Model()
    payment_status = models.Model(max_length=1, choices=PAYMENT_STATUS_CHOICES)


class Address(models.Model):
    street = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    customer = models.OneToOneField(
        Customer, on_delete=models.CASCADE, primary_key=True
    )
     
