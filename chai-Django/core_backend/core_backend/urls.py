from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", views.Home, name="home"),
    path("about/", views.About, name="about"),
    path("contact/", views.Contact, name="contact"),
    path("chai/", include("chai.urls")),
]
