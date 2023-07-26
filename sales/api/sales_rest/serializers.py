from common.json import ModelEncoder
from .models import (
    AutomobileVO,
    Salesperson,
    Customer,
    Sale,
)


class AutomobileEncoder(ModelEncoder):
    model = AutomobileVO
    properties = (
        "id",
        "vin",
        "sold",
    )


class SalesPersonEncoder(ModelEncoder):
    model = Salesperson
    properties = (
        "id",
        "first_name",
        "last_name",
        "employee_id",
    )


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = (
        "id",
        "first_name",
        "last_name",
        "address",
        "phone_number",
    )


class SaleEncoder(ModelEncoder):
    model = Sale
    properties = (
        "id",
        "price",
        "automobile",
        "salesperson",
        "customer",
    )
    encoders = {
        "automobile": AutomobileEncoder(),
        "salesperson": SalesPersonEncoder(),
        "customer": CustomerEncoder(),
    }
