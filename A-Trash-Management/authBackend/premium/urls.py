from django.urls import path
from .views import PremiumView, PremiumDetailView
urlpatterns = [
    path("premiums/", PremiumView.as_view()),
    path("premiums/<int:pk>/", PremiumDetailView.as_view()),
]
