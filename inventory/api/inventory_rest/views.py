from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from .encoders import (
    AutomobileEncoder,
    ManufacturerEncoder,
    VehicleModelEncoder,
)
from .models import Automobile, Manufacturer, VehicleModel

# paul imports
import os
import requests

PEXELS_API_KEY = os.environ["PEXELS_API_KEY"]


# end paul imports
@require_http_methods(["GET", "POST"])
def api_automobiles(request):
    if request.method == "GET":
        autos = Automobile.objects.all()
        return JsonResponse(
            {"autos": autos},
            encoder=AutomobileEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            model_id = content["model_id"]
            model = VehicleModel.objects.get(pk=model_id)
            content["model"] = model
            auto = Automobile.objects.create(**content)
            return JsonResponse(
                auto,
                encoder=AutomobileEncoder,
                safe=False,
            )
        except:
            response = JsonResponse({"message": "Could not create the automobile"})
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def api_automobile(request, vin):
    if request.method == "GET":
        try:
            auto = Automobile.objects.get(vin=vin)
            return JsonResponse(auto, encoder=AutomobileEncoder, safe=False)
        except Automobile.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            auto = Automobile.objects.get(vin=vin)
            auto.delete()
            return JsonResponse(
                auto,
                encoder=AutomobileEncoder,
                safe=False,
            )
        except Automobile.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else:  # PUT
        try:
            content = json.loads(request.body)
            auto = Automobile.objects.get(vin=vin)

            props = ["color", "year", "sold"]
            for prop in props:
                if prop in content:
                    setattr(auto, prop, content[prop])
            auto.save()
            return JsonResponse(
                auto,
                encoder=AutomobileEncoder,
                safe=False,
            )
        except Automobile.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_manufacturers(request):
    if request.method == "GET":
        manufacturers = Manufacturer.objects.all()
        return JsonResponse(
            {"manufacturers": manufacturers},
            encoder=ManufacturerEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            manufacturer = Manufacturer.objects.create(**content)
            return JsonResponse(
                manufacturer,
                encoder=ManufacturerEncoder,
                safe=False,
            )
        except:
            response = JsonResponse({"message": "Could not create the manufacturer"})
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def api_manufacturer(request, pk):
    if request.method == "GET":
        try:
            manufacturer = Manufacturer.objects.get(id=pk)
            return JsonResponse(manufacturer, encoder=ManufacturerEncoder, safe=False)
        except Manufacturer.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            manufacturer = Manufacturer.objects.get(id=pk)
            manufacturer.delete()
            return JsonResponse(
                manufacturer,
                encoder=ManufacturerEncoder,
                safe=False,
            )
        except Manufacturer.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else:  # PUT
        try:
            content = json.loads(request.body)
            manufacturer = Manufacturer.objects.get(id=pk)

            props = ["name"]
            for prop in props:
                if prop in content:
                    setattr(manufacturer, prop, content[prop])
            manufacturer.save()
            return JsonResponse(
                manufacturer,
                encoder=ManufacturerEncoder,
                safe=False,
            )
        except Manufacturer.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_vehicle_models(request):
    if request.method == "GET":
        models = VehicleModel.objects.all()
        return JsonResponse({"models": models}, encoder=VehicleModelEncoder)
    else:
        try:
            content = json.loads(request.body)
            manufacturer_id = content["manufacturer_id"]
            manufacturer = Manufacturer.objects.get(id=manufacturer_id)
            content["manufacturer"] = manufacturer
            model = VehicleModel.objects.create(**content)
            return JsonResponse(
                model,
                encoder=VehicleModelEncoder,
                safe=False,
            )
        except:
            response = JsonResponse({"message": "Could not create the vehicle model"})
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def api_vehicle_model(request, pk):
    if request.method == "GET":
        try:
            model = VehicleModel.objects.get(id=pk)
            return JsonResponse(model, encoder=VehicleModelEncoder, safe=False)
        except VehicleModel.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            model = VehicleModel.objects.get(id=pk)
            model.delete()
            return JsonResponse(
                model,
                encoder=VehicleModelEncoder,
                safe=False,
            )
        except VehicleModel.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else:  # PUT
        try:
            content = json.loads(request.body)
            model = VehicleModel.objects.get(id=pk)
            props = ["name", "picture_url"]
            for prop in props:
                if prop in content:
                    setattr(model, prop, content[prop])
            model.save()
            return JsonResponse(
                model,
                encoder=VehicleModelEncoder,
                safe=False,
            )
        except VehicleModel.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response


### I added below here


@require_http_methods(["POST"])
def get_car_model_picture(request):
    content = json.loads(request.body)

    car_model = content["name"]

    manufacturer_id = content["manufacturer_id"]
    manufacturer = Manufacturer.objects.get(id=manufacturer_id)
    manu_name = manufacturer.name

    headers = {"Authorization": PEXELS_API_KEY}
    params = {
        "per_page": 1,
        "query": f"{car_model} {manu_name}",
    }
    url = "https://api.pexels.com/v1/search"
    response = requests.get(url, params=params, headers=headers)
    content = json.loads(response.content)
    photo = content["photos"][0]["src"]["tiny"]
    return JsonResponse(photo, safe=False)
