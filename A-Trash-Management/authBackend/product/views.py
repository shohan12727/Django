from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Product
from .serializers import ProductSerializer

# Create your views here.


class ProductView(APIView):

    def get(self, request):
        products = Product.objects.all().order_by("-created_at")
        serializers = ProductSerializer(products, many=True)
        return Response(serializers.data)

    def post(self, request):
        serializers = ProductSerializer(data=request.data)

        if serializers.is_valid():
            serializers.save()
            return Response("Product created successfully")

        return Response(serializers.error, status=status.HTTP_404_NOT_FOUND)
