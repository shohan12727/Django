from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("add/", views.add_todo, name="add_todo"),
    # path("delete/<uuid:todo_id>", views.delete_todo, name="delete_todo"),
    # path("completer/<uuid:todo_id>", views.complete_todo, name="complete_todo"),
]
