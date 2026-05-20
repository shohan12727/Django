from rest_framework.routers import DefaultRouter
from .views import PostViewset

router = DefaultRouter()
router.register(r'allPosts',PostViewset)

urlpatterns = router.urls
