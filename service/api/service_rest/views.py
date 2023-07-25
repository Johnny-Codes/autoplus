from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.http import require_http_methods
from .serializers import (
    ListTechnicianEncoder,
    AppointmentEncoder,
    AutomobileEncoder,
)
from .models import Technician, Appointment, AutomobileVO
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
        tech = Technician.objects.create(**content)
        tech_id = tech.id
        get_tech = Technician.objects.get(id=tech_id)
        name = f"{get_tech.id} {get_tech.first_name} {get_tech.last_name} created"
        return JsonResponse(
            name,
            safe=False,
        )


@require_http_methods(["DELETE"])
def delete_tech(request, id):
    if request.method == "DELETE":
        tech = Technician.objects.get(id=id)
        tech.delete()
        return JsonResponse(
            {"successfully deleted": "technician"},
            safe=False,
        )


@require_http_methods(["GET", "POST"])
def appointment_view(request):
    if request.method == "GET":
        appointments = Appointment.objects.all().order_by("id")
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        try:
            tech = Technician.objects.get(id=content["technician"])
            content["technician"] = tech
        except Technician.DoesNotExist:
            return JsonResponse(
                "tech does not exist",
                safe=False,
            )
        Appointment.objects.update_or_create(**content)
        return JsonResponse("cool", safe=False)


@require_http_methods(["PUT", "DELETE"])
def update_appointment(request, id):
    appt = Appointment.objects.get(id=id)
    if request.method == "PUT":
        data = json.loads(request.body)
        appt.status = data["status"]
        appt.save()
        return JsonResponse(
            "updated",
            safe=False,
        )
    else:
        appt.delete()
        return JsonResponse(
            "deleted",
            safe=False,
        )


@require_http_methods(["GET"])
def list_automobiles(request):
    autos = AutomobileVO.objects.all()
    return JsonResponse(
        {"autos": autos},
        encoder=AutomobileEncoder,
        safe=False,
    )
