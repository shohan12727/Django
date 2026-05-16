from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Consumer
from .serializers import ConsumerSerializer

# Create your views here.


class ConsumerView(APIView):

    def get(self, request):
        consumers = Consumer.objects.all().order_by("-created_at")
        serializers = ConsumerSerializer(consumers, many=True)
        return Response(serializers.data)

    def post(self, request):

        serializers = ConsumerSerializer(data=request.data)

        if serializers.is_valid():
            serializers.save()
            return Response("Consumer created successfully")

        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
