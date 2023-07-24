from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.http import require_http_methods
from .serializers import ListTechnicianEncoder
from .models import Technician
import json


# Create your views here.
@require_http_methods(["GET", "POST"])
def technicians_view(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=ListTechnicianEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        return HttpResponse("Yay")
