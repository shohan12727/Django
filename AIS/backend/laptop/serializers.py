from rest_framework import serializers
from .models import Laptop, LaptopImage


class LaptopImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = LaptopImage
        fields = "__all__"


class LaptopSerializer(serializers.ModelSerializer):
    gallery = LaptopImageSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Laptop
        fields = "__all__"