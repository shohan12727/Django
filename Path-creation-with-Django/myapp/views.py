from django.shortcuts import render
from django.http import HttpResponse


# Create your views here.
def home(request):
    # process1
    # process2
    # process3
    return HttpResponse("Hello King")

def profile(request):
    return HttpResponse("I am in profile")

def dashboard(request): 
    return HttpResponse("I am in dashboard")


def allMapsData(request):
    # process 1
    # process 2 
    # process 3 
    return HttpResponse("Here you will get all the maps data")


def portfolioData(request):
    return HttpResponse("Here you will get all the portfolio data resposne")

def dummyPath(request):
    return HttpResponse("This is full dummy response, just for test")