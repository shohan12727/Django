from django.contrib import admin
from .models import Laptop, LaptopImage


class LaptopImageInline(admin.TabularInline):
    model = LaptopImage
    extra = 1


@admin.register(Laptop)
class LaptopAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "brand",
        "price",
        "stock",
        "is_available",
    )

    prepopulated_fields = {
        "slug": ("name",)
    }

    inlines = [LaptopImageInline]


@admin.register(LaptopImage)
class LaptopImageAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "laptop",
        "created_at",
    )