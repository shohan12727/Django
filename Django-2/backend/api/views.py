from django.shortcuts import render
from django.http import HttpResponse
from django.views import View
from .forms import Reservation

# Create your views here.

def home(request):
    return HttpResponse("Hey hello, i am home page")

class HelloBangladesh(View):
    def get(self,request):
        return HttpResponse("Hello Bangladesh")

def home_reservation(request):
        form = Reservation()
        
        if request.method == 'POST':
            form = Reservation(request.POST)
            if form.is_valid():
                form.save()
                return HttpResponse("Success")
        return render(request, 'index.html', {'form': form})    