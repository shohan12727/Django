from rest_framework import viewsets
from .models import PostModel
from .serializers import PostSerializer


class PostViewset(viewsets.ModelViewSet):
    queryset = PostModel.objects.all()
    serializer_class = PostSerializer
    
    