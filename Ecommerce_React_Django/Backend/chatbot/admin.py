from django.contrib import admin
from .models import PatientReport


@admin.register(PatientReport)
class PatientReportAdmin(admin.ModelAdmin):
    list_display = ("patient_name", "created_at")