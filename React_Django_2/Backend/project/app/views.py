from django.shortcuts import render
from rest_framework import generics
from .models import ToDo
from .serializers import TodoSerializers


# Create your views here.



class ToDoListCreateView(generics.ListCreateAPIView):
    queryset = ToDo.objects.all().order_by('-created_at')
    serializer_class = TodoSerializers
    

class ToDoUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ToDo.objects.all()
    serializer_class = TodoSerializers    