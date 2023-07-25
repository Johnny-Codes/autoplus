from django.db import models


# Create your models here.
class Technician(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    employee_id = models.CharField(
        max_length=50,
        unique=True,
    )

    def __str__(self):
        return f"{self.last_name}, {self.first_name}"

    class Meta:
        verbose_name_plural = "Technicians"
        verbose_name = "Technician"


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17)
    sold = models.BooleanField(default=False)

    def __str__(self):
        return self.vin

    class Meta:
        verbose_name_plural = "Automobile VOs"
        verbose_name = "Automobile VO"


class Appointment(models.Model):
    vin = models.CharField(max_length=17)
    date_time = models.DateTimeField()
    reason = models.TextField()
    STATUS_CHOICES = [
        ("Created", "Created"),
        ("Canceled", "Canceled"),
        ("Finished", "Finished"),
    ]
    status = models.CharField(
        choices=STATUS_CHOICES,
        max_length=25,
        default="Created",
    )
    customer = models.CharField(max_length=64)
    technician = models.ForeignKey(
        Technician,
        on_delete=models.CASCADE,
        related_name="appointment",
    )

    def __str__(self):
        return f"{self.customer} {self.status}"

    class Meta:
        verbose_name_plural = "Appointments"
        verbose_name = "Appointment"
