from django.urls import path
from .views import technicians_view

urlpatterns = [
    path(
        "technicians/",
        technicians_view,
        name="technicians_view",
    )
]
