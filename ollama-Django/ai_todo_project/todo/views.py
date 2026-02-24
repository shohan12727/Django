# from django.shortcuts import render
# from .models import TodoItem, AITodoItemSteps
# from .forms import TodoItemForm
# import uuid
# from django.shortcuts import render, redirect,  get_object_or_404
# import ollama
# # Create your views here.

# def index(request):
#     todo_items  = TodoItem.objects.all()
#     return render(request, "todo/index.html", {"todo_items": todo_items})


# def add_todo(request):
#     if request.method == "GET":
#         form = TodoItemForm()
#         return render(request,"todo/add_todo.html",{"form":form})
#     elif request.method == "POST":
#         form = TodoItemForm(request.POST)
        
#         if form.is_valid():
#             title = form.cleaned_data["title"]
#             description = form.cleaned_data["description"]
            
#             ai_todo_item_steps = AITodoItemSteps(steps=[])
            
#             example_todo_item_steps = AITodoItemSteps(steps=[
#                 "Example Item 1",
#                 "Example Item 2",
#                 "Example Item 3",
#                 "Example Item 4",
#                 "Example Item 5",
#                 "Example Item 6",
#             ])
            
            
            
#             ai_prompt = f"""
#             Generate the steps required to complete the following task and return them as a a JSON object:
            
#             The following is the title of the task 
#             <task_title>
#             {title}
#             </task_title>  
            
#             The following is the description of the task   
#             <task_description>
#             {description}
#             </task_description>    
            
#             The following is the example of the exact format your JSON response must be in:
#             <example>
#             {example_todo_item_steps.model_dump_json(indent=4)}
#             </example>
            
#             Instructions: 
#             - Create a list of steps to complete the task,
#             - Generate a valid JSON object that matches the above schema,
#             - Return only valid JSON with no additional text, markdown, or explanation.
#             - Your output should be structured exactly like the example above but with different, and real values
#             - Do not include ``` and ```JSON in your response .
#             - Do now wrap anything around the JSON object 
            
            
            
#             """
#             print(ai_prompt)
             
#             response = ollama.chat(model="llama3.2:1b", messages=[
#                 {"role": "user", "content": ai_prompt}
#             ])
            
#             content = response['message']['content']
            
#             print(content)
            
#             ai_todo_item_steps = AITodoItemSteps.model_validate_json(content)
            
            
            
            
            
#             TodoItem.objects.create(
#                 id = uuid.uuid4(),
#                 title = title,
#                 description = description,
#                 steps=[step for step in ai_todo_item_steps]
#             )
            
#         return redirect("index")    
        
 
# def complete_todo(request, todo_id):
#     todo_item = get_object_or_404(TodoItem, id = todo_id)
#     todo_item.completed = True
#     todo_item.save()
#     return redirect("index")
     
# def delete_todo(request, todo_id):
#     todo_item = get_object_or_404(TodoItem, id = todo_id)
#     todo_item.delete()
#     return redirect("index")
     
from django.shortcuts import render, redirect, get_object_or_404
from .models import TodoItem, AITodoItemSteps
from .forms import TodoItemForm
import uuid
import ollama
import json
from pydantic import ValidationError

# Index page: show all todos
def index(request):
    todo_items = TodoItem.objects.all()
    return render(request, "todo/index.html", {"todo_items": todo_items})


# Add a new todo
def add_todo(request):
    if request.method == "GET":
        form = TodoItemForm()
        return render(request, "todo/add_todo.html", {"form": form})

    elif request.method == "POST":
        form = TodoItemForm(request.POST)

        if form.is_valid():
            title = form.cleaned_data["title"]
            description = form.cleaned_data["description"]

            # Example JSON schema for AI
            example_todo_item_steps = AITodoItemSteps(steps=[
                "Example Item 1",
                "Example Item 2",
                "Example Item 3",
                "Example Item 4",
                "Example Item 5",
                "Example Item 6",
            ])

            # Prepare AI prompt
            ai_prompt = f"""
Generate the steps required to complete the following task and return them as a JSON object only.

Task title:
{title}

Task description:
{description}

Example JSON format:
{example_todo_item_steps.model_dump_json(indent=4)}

Instructions:
- Return only valid JSON that matches the example format.
- Do not include any text outside the JSON.
- Do not wrap JSON in markdown or extra characters.
"""
            # print("AI Prompt:\n", ai_prompt)

            # Call Ollama model
            response = ollama.chat(model="llama3.2:1b", messages=[{"role": "user", "content": ai_prompt}])
            content = response['message']['content'].strip()  # remove extra spaces/newlines
            # print("AI Response:\n", content)

            # Safely parse JSON with Pydantic
            try:
                ai_todo_item_steps = AITodoItemSteps.model_validate_json(content)
            except ValidationError as e:
                print("Validation Error:", e)
                # Fallback to example steps if AI response is invalid
                ai_todo_item_steps = example_todo_item_steps

            # Save to database
            TodoItem.objects.create(
                id=uuid.uuid4(),
                title=title,
                description=description,
                steps=[step for step in ai_todo_item_steps.steps]  # ensure list of strings
            )

        return redirect("index")


# Mark a todo as completed
def complete_todo(request, todo_id):
    todo_item = get_object_or_404(TodoItem, id=todo_id)
    todo_item.completed = True
    todo_item.save()
    return redirect("index")


# Delete a todo
def delete_todo(request, todo_id):
    todo_item = get_object_or_404(TodoItem, id=todo_id)
    todo_item.delete()
    return redirect("index")        