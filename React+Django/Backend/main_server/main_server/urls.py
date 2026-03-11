
# from django.contrib import admin
# from django.urls import path
# # from django.conf.urls import url
# from subApp.views import *

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('',ReactView.as_view(), name="anything")
# ]

from django.contrib import admin
from django.urls import path
from subApp.views import ReactView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('react/', ReactView.as_view(), name="react"),  
]