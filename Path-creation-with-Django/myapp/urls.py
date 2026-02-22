from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="home"),
    path('profile/', views.profile, name="profile"),
    path('dashboard/', views.dashboard, name="dashboard"),
    path('allMapsData/', views.allMapsData , name="allMapData"),
    path('portfolioData/', views.portfolioData, name="All portfolio data"),
    path('dummypath/', views.dummyPath, name="dummy path"),
]



