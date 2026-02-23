from django.urls import path
from . import views

urlpatterns= [
    path('function', views.home, name = 'home'),  #function base view we path 
    path('class', views.HelloBangladesh.as_view()),  #class base view er path
    path('reservation', views.home_reservation, name = "home reservation")
]