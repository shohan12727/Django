from django.http import HttpResponse
from django.shortcuts import render

def Home(request):
    # return HttpResponse("Hello i am from  django")
    return render(request, 'website/index.html')
        
def Contact(request):
    return HttpResponse("Hello i am from  contact")

def About(request):
    return HttpResponse("Hello i am from  about")

