from rest_framework import viewsets
from .models import AuthorModel
from .serializers import AuthorSerializer

# Create your views here.


class AuthorViewSet(viewsets.ModelViewSet):
    queryset = AuthorModel.objects.all()
    serializer_class = AuthorSerializer
    