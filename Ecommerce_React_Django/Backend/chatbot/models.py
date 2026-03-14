from django.db import models


class PatientReport(models.Model):
    patient_name = models.CharField(max_length=200)
    symptoms = models.TextField()
    diagnosis = models.TextField(blank=True, null=True)

    ai_summary = models.TextField(blank=True, null=True)
    ai_suggestion = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.patient_name