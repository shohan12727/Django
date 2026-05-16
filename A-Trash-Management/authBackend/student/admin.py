from django.contrib import admin
from .models import Student


@admin.register(Student)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = [
        "full_name",
        "student_id",
        "department_name",
        "phone_number",
        "created_at",
    ]
