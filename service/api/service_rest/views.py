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
        try:
            content = json.loads(request.body)
            tech = Technician.objects.create(**content)
            tech_id = tech.id
            technician = Technician.objects.get(id=tech_id)
            return JsonResponse(
                technician,
                encoder=ListTechnicianEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {
                    "message": "Could not create the\
                                      technician"
                }
            )
            response.status_code = 404
            return response


@require_http_methods(["DELETE"])
def delete_tech(request, id):
    if request.method == "DELETE":
        try:
            tech = Technician.objects.get(id=id)
            tech.delete()
            return JsonResponse(
                tech,
                encoder=ListTechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Technician does not exist"})
            response.status_code = 404
            return response


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
            response = JsonResponse({"message": "technician does not exist"})
            response.status_code = 404
            return response

        appt = Appointment.objects.update_or_create(**content)
        return JsonResponse(appt, encoder=AppointmentEncoder, safe=False)


@require_http_methods(["PUT", "DELETE"])
def update_appointment(request, id):
    if request.method == "PUT":
        try:
            content = json.loads(request.body)
            appt = Appointment.objects.get(id=id)
            props = ["status"]
            for prop in props:
                if prop in content:
                    setattr(appt, prop, content[prop])
            appt.save()
            return JsonResponse(
                appt,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    else:
        try:
            appt = Appointment.objects.get(id=id)
            appt.delete()
            return JsonResponse(
                appt,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET"])
def list_automobiles(request):
    autos = AutomobileVO.objects.all()
    return JsonResponse(
        {"autos": autos},
        encoder=AutomobileEncoder,
        safe=False,
    )
