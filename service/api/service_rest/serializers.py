from common.json import ModelEncoder
from .models import Technician


class ListTechnicianEncoder(ModelEncoder):
    model = Technician
    properties = (
        "first_name",
        "last_name",
        "employee_id",
    )
