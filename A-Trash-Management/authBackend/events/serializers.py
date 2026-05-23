from rest_framework import serializers
from .models import (
    EventCategory,
    EventTag,
    Events,
    EventRegistration,
    EventFeedback,
)


class EventCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = EventCategory
        fields = "__all__"


class EventTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventTag
        fields = "__all__"


class EventsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Events
        fields = "__all__"


class EventRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventRegistration
        fields = "__all__"


class EventFeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventFeedback
        fields = "__all__"