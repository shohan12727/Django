from rest_framework.viewsets import ModelViewSet
from .models import Laptop
from .serializers import LaptopSerializer


class LaptopViewSet(ModelViewSet):
    queryset = Laptop.objects.all()
    serializer_class = LaptopSerializer