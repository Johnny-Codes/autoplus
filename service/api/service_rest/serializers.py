from common.json import ModelEncoder
from .models import (
    Technician,
    AutomobileVO,
    Appointment,
)


class ListTechnicianEncoder(ModelEncoder):
    model = Technician
    properties = (
        "first_name",
        "last_name",
        "employee_id",
    )


class AutomobileEncoder(ModelEncoder):
    model = AutomobileVO
    properties = (
        "vin",
        "sold",
    )


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = (
        "id",
        "date_time",
        "reason",
        "status",
        "customer",
        "technician",
    )

    encoders = {
        "technician": ListTechnicianEncoder(),
    }
