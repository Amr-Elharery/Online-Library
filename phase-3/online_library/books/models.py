from django.db import models

class Book(models.Model):
    name = models.CharField(max_length=50)
    image = models.ImageField(upload_to="images/%y/%m", default="images/default/default.png")
    available = models.BooleanField(default=True)
    author = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    link = models.URLField(max_length=1000, default=None)
    def __str__(self):
        return f"{self.id}  {self.name}"
