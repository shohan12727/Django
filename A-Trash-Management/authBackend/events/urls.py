from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    EventCategoryViewSet,
    EventTagViewSet,
    EventsViewSet,
    EventRegistrationViewSet,
    EventFeedbackViewSet,
)

router = DefaultRouter()

router.register(r"categories", EventCategoryViewSet)
router.register(r"tags", EventTagViewSet)
router.register(r"events", EventsViewSet)
router.register(r"registrations", EventRegistrationViewSet)
router.register(r"feedbacks", EventFeedbackViewSet)


urlpatterns = router.urls