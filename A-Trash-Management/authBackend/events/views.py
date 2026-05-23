from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet

from .models import (
    EventCategory,
    EventTag,
    Events,
    EventRegistration,
    EventFeedback,
)

from .serializers import (
    EventCategorySerializer,
    EventTagSerializer,
    EventsSerializer,
    EventRegistrationSerializer,
    EventFeedbackSerializer,
)


class EventCategoryViewSet(ModelViewSet):
    queryset = EventCategory.objects.all()
    serializer_class = EventCategorySerializer


class EventTagViewSet(ModelViewSet):
    queryset = EventTag.objects.all()
    serializer_class = EventTagSerializer


class EventsViewSet(ModelViewSet):
    queryset = Events.objects.all()
    serializer_class = EventsSerializer


class EventRegistrationViewSet(ModelViewSet):
    queryset = EventRegistration.objects.all()
    serializer_class = EventRegistrationSerializer


class EventFeedbackViewSet(ModelViewSet):
    queryset = EventFeedback.objects.all()
    serializer_class = EventFeedbackSerializer