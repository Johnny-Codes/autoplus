from django.urls import path
from .views import (
    automobile_view,
    salesperson_view,
    delete_salesperson,
    customer_view,
    delete_customer,
    sale_view,
    delete_sale,
)

urlpatterns = [
    path(
        "automobiles/",
        automobile_view,
        name="automobile_view",
    ),
    path(
        "salespeople/",
        salesperson_view,
        name="list_salespeople",
    ),
    path(
        "salespeople/<int:id>/",
        delete_salesperson,
        name="delete_salesperson",
    ),
    path(
        "customers/",
        customer_view,
        name="list_customers",
    ),
    path(
        "customers/<int:id>/",
        delete_customer,
        name="delete_customer",
    ),
    path(
        "sales/",
        sale_view,
        name="list_sales",
    ),
    path(
        "sales/<int:id>/",
        delete_sale,
        name="delete_sale",
    ),
]
