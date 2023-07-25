from django.db import models


# Create your models here.
class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17)
    sold = models.BooleanField(default=False)


class Salesperson(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    employee_id = models.CharField(
        max_length=50,
        unique=True,
    )

    def __str__(self):
        return f"{self.last_name}, {self.first_name}"

    class Meta:
        verbose_name_plural = "Salespeople"
        verbose_name = "Salesperson"


class Customer(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    address = models.TextField()
    phone_number = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.last_name}, {self.first_name}"

    class Meta:
        verbose_name_plural = "Customers"
        verbose_name = "Customer"


class Sale(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        on_delete=models.CASCADE,
        related_name="sale",
    )
    salesperson = models.ForeignKey(
        Salesperson,
        on_delete=models.CASCADE,
        related_name="sale",
    )
    customer = models.ForeignKey(
        Customer,
        on_delete=models.CASCADE,
        related_name="sale",
    )
    price = models.IntegerField()
