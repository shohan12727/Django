from django.urls import path
from .views import ToDoListCreateView, ToDoUpdateDeleteView


urlpatterns = [
    path('todo/', ToDoListCreateView.as_view(), name='todo-list-create'),
    path('todo/<int:pk>', ToDoUpdateDeleteView.as_view(), name='todo-update-delete')
]
