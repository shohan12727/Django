from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Student
from .serializers import StudentSerializers
# Create your views here.

#get all student and post 
class StudentListCreateAPIView(APIView):
    
    def get(self,request):
        students = Student.objects.all().order_by("-created_at")
        serializers = StudentSerializers(students, many=True)
        return Response(serializers.data)

    def post(self, request):
        serializer = StudentSerializers(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "message": "Student created successfully",
                    "data": serializer.data
                },
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)