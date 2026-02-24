from django.shortcuts import render
from .models import TodoItem
from .forms import TodoItemForm
import uuid
from django.shortcuts import render, redirect
# Create your views here.

def index(request):
    todo_items  = TodoItem.objects.all()
    return render(request, "todo/index.html", {"todo_items": todo_items})


def add_todo(request):
    if request.method == "GET":
        form = TodoItemForm()
        return render(request,"todo/add_todo.html",{"form":form})
    elif request.method == "POST":
        form = TodoItemForm(request.POST)
        
        if form.is_valid():
            title = form.cleaned_data["title"]
            description = form.cleaned_data["description"]
            
            
            TodoItem.objects.create(
                id = uuid.uuid4(),
                title = title,
                description = description 
            )
            
        return redirect("index")    
        
        