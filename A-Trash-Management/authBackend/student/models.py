from django.db import models

# Create your models here.


class Student(models.Model):
    full_name = models.CharField(max_length=100)
    student_id = models.IntegerField(default=0)
    department_name = models.CharField(max_length=20)
    phone_number = models.CharField(max_length=11)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} - {self.student_id}"
