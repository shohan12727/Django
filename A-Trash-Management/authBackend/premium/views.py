from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Premium
from .serializers import PremiumSerializer


class PremiumView(APIView):
    
    def get(self,request):
        premium = Premium.objects.all()
        serializers = PremiumSerializer(premium, many=True)
        return Response(serializers.data)
    
    def post(self,request):
        serializers = PremiumSerializer(data=request.data)
        
        if serializers.is_valid():
            serializers.save()
            return Response("Premium user created successfully", status=status.HTTP_201_CREATED)
        
        return Response(serializers.errors, status=status.HTTP_404_NOT_FOUND)
    

class PremiumDetailView(APIView):

    def get_object(self, pk):
        try:
            return Premium.objects.get(pk=pk)
        except Premium.DoesNotExist:
            return None

    # GET SINGLE DATA (DETAILS)
    def get(self, request, pk):
        premium = self.get_object(pk)

        if not premium:
            return Response(
                {"error": "Premium not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = PremiumSerializer(premium)
        return Response(serializer.data)

    # PATCH / UPDATE
    def patch(self, request, pk):
        premium = self.get_object(pk)

        if not premium:
            return Response(
                {"error": "Premium not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = PremiumSerializer(
            premium,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "message": "Premium updated successfully",
                    "data": serializer.data,
                }
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # DELETE
    def delete(self, request, pk):
        premium = self.get_object(pk)

        if not premium:
            return Response(
                {"error": "Premium not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        premium.delete()

        return Response(
            {"message": "Premium deleted successfully"},
            status=status.HTTP_204_NO_CONTENT,
        )

