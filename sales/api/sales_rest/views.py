from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.http import require_http_methods
from .models import (
    AutomobileVO,
    Customer,
    Salesperson,
    Sale,
)
from .serializers import (
    AutomobileEncoder,
    SalesPersonEncoder,
    CustomerEncoder,
    SaleEncoder,
)
import json


@require_http_methods(["GET"])
def automobile_view(request):
    autos = AutomobileVO.objects.all()
    return JsonResponse(
        {"autos": autos},
        encoder=AutomobileEncoder,
        safe=False,
    )


@require_http_methods(["GET", "POST"])
def salesperson_view(request):
    if request.method == "GET":
        salesperson = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople": salesperson},
            encoder=SalesPersonEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        salesperson = Salesperson.objects.create(**content)
        return JsonResponse(
            salesperson,
            encoder=SalesPersonEncoder,
            safe=False,
        )


@require_http_methods(["DELETE"])
def delete_salesperson(request, id):
    try:
        youre_fired = Salesperson.objects.get(id=id)
        youre_fired.delete()
        return JsonResponse(
            "they were fired",
            safe=False,
        )
    except Salesperson.DoesNotExist:
        return JsonResponse(
            {"message": "they were already fired and/or were never hired!"},
            safe=False,
        )


@require_http_methods(["GET", "POST"])
def customer_view(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )


@require_http_methods(["DELETE"])
def delete_customer(request, id):
    try:
        Customer.objects.get(id=id).delete()
        return JsonResponse(
            "good job!",
            safe=False,
        )
    except Customer.DoesNotExist:
        response = JsonResponse({"message": "Does not exist"})
        response.status_code = 400
        return response


@require_http_methods(["GET", "POST"])
def sale_view(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SaleEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        try:
            automobile = AutomobileVO.objects.get(id=content["automobile"])
            salesperson = Salesperson.objects.get(id=content["salesperson"])
            customer = Customer.objects.get(id=content["customer"])
            content["automobile"] = automobile
            content["salesperson"] = salesperson
            content["customer"] = customer
        except AutomobileVO.DoesNotExist:
            response = JsonResponse({"message": "automobile does not exist"})
            response.status_code = 400
            return response
        except Salesperson.DoesNotExist:
            response = JsonResponse({"message": "salesperson does not exist"})
            response.status_code = 400
            return response
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "customer does not exist"})
            response.status_code = 400
            return response
        sale = Sale.objects.create(**content)
        return JsonResponse(
            sale,
            encoder=SaleEncoder,
            safe=False,
        )


@require_http_methods(["DELETE"])
def delete_sale(request, id):
    try:
        Sale.objects.get(id=id).delete()
        return JsonResponse(
            "deleted",
            safe=False,
        )
    except Sale.DoesNotExist:
        response = JsonResponse({"message": "this sale does not exist"})
        response.status_code = 400
        return response
