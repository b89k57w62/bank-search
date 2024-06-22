from django.db import models

class Bank(models.Model):
    code = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=100)


class Branch(models.Model):
    bank = models.ForeignKey(Bank, on_delete=models.CASCADE, related_name='branches')
    code = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)