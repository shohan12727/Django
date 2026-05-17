from rest_framework import serializers
from .models import Premium


class PremiumSerializer(serializers.ModelSerializer):

    class Meta:
        model = Premium
        fields = [
            "id",
            "name",
            "description",
            "price",
            "is_active",
            "billing_cycle",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["created_at", "updated_at"]
