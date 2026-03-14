from django.urls import path
from .views import generate_patient_summary, get_patient_reports

urlpatterns = [
    path("generate-summary/", generate_patient_summary, name="generate-summary"),
    path("reports/", get_patient_reports, name="reports"),
]