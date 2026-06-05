from django.db import models


class Laptop(models.Model):
    # Basic Information
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)

    brand = models.CharField(max_length=100)
    model_number = models.CharField(max_length=100, blank=True, null=True)

    description = models.TextField()
    short_description = models.CharField(max_length=500, blank=True)

    # Pricing
    price = models.DecimalField(max_digits=12, decimal_places=2)
    discount_price = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        blank=True,
        null=True
    )

    stock = models.PositiveIntegerField(default=0)

    # Processor
    processor_brand = models.CharField(max_length=100)
    processor_model = models.CharField(max_length=200)
    processor_generation = models.CharField(max_length=100, blank=True)

    # RAM
    ram_size = models.PositiveIntegerField(help_text="RAM size in GB")
    ram_type = models.CharField(max_length=50)

    # Storage
    storage_size = models.PositiveIntegerField(help_text="Storage size in GB")

    storage_type = models.CharField(
        max_length=50,
        choices=[
            ("SSD", "SSD"),
            ("HDD", "HDD"),
            ("NVME", "NVME"),
        ]
    )

    # Graphics
    gpu_brand = models.CharField(max_length=100, blank=True)
    gpu_model = models.CharField(max_length=200, blank=True)

    # Display
    display_size = models.DecimalField(
        max_digits=4,
        decimal_places=1,
        help_text="Inches"
    )

    resolution = models.CharField(max_length=50, blank=True)

    refresh_rate = models.PositiveIntegerField(
        default=60,
        help_text="Hz"
    )

    panel_type = models.CharField(max_length=50, blank=True)
    touchscreen = models.BooleanField(default=False)

    # Battery
    battery_capacity = models.CharField(max_length=100, blank=True)
    battery_life = models.CharField(max_length=100, blank=True)

    # Physical
    weight = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        blank=True,
        null=True,
        help_text="Weight in KG"
    )

    color = models.CharField(max_length=100, blank=True)

    # Operating System
    operating_system = models.CharField(max_length=100, blank=True)

    # Connectivity
    wifi = models.BooleanField(default=True)
    bluetooth = models.BooleanField(default=True)

    # Ports
    usb_ports = models.PositiveIntegerField(default=0)
    usb_type_c_ports = models.PositiveIntegerField(default=0)
    hdmi_ports = models.PositiveIntegerField(default=0)

    # Camera & Audio
    webcam = models.BooleanField(default=True)
    microphone = models.BooleanField(default=True)

    # Main Thumbnail Image
    main_image = models.ImageField(
        upload_to="laptops/main/"
    )

    # Status
    is_featured = models.BooleanField(default=False)
    is_available = models.BooleanField(default=True)

    # SEO
    meta_title = models.CharField(max_length=255, blank=True)
    meta_description = models.TextField(blank=True)

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class LaptopImage(models.Model):
    laptop = models.ForeignKey(
        Laptop,
        on_delete=models.CASCADE,
        related_name="gallery"
    )

    image = models.ImageField(
        upload_to="laptops/gallery/"
    )

    alt_text = models.CharField(
        max_length=255,
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.laptop.name} Image"