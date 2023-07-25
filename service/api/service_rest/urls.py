from django.urls import path
from .views import (
    technicians_view,
    delete_tech,
    appointment_view,
    update_appointment,
)

urlpatterns = [
    path(
        "technicians/",
        technicians_view,
        name="technicians_view",
    ),
    path(
        "technicians/<int:id>/delete/",
        delete_tech,
        name="delete technician",
    ),
    path(
        "appointments/",
        appointment_view,
        name="appointment_view",
    ),
    path(
        "appointments/<int:id>/cancel",
        update_appointment,
        name="cancel_appointment",
    ),
    path(
        "appointments/<int:id>/finish",
        update_appointment,
        name="finish_appointment",
    ),
    path(
        "appointments/<int:id>/",
        update_appointment,
        name="delete_appointment",
    ),
]
