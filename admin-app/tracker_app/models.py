from django.db import models
import uuid

# Create your models here.
class Parcel(models.Model):
    user_email = models.CharField(max_length=100)
    detail = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    tracking_id = models.CharField(max_length=100, unique=True)
    departure = models.CharField(max_length=100, default="Helsinki")
    destination = models.CharField(max_length=100, default="Estonia")

    def __str__(self):
        return f"{self.tracking_id}"
    
    def save(self, *args, **kwargs):
        self.tracking_id = uuid.uuid4().hex[:10]  # Generate a random tracking ID
        super(Parcel, self).save(*args, **kwargs)

class StatusChoices(models.TextChoices):
        PENDING = 'Pending'
        IN_TRANSIT = 'In Transit'
        DELIVERED = 'Delivered'
        SHIPPED = 'Shipped'

class Action(models.Model):

    status = models.CharField(max_length=20, choices=StatusChoices.choices)
    location = models.CharField(max_length=100)
    action_performed = models.CharField(max_length=100)
    comments = models.TextField()
    parcel = models.ForeignKey('Parcel', on_delete=models.CASCADE, related_name='actions')

    def __str__(self):
        return f"{self.status} - {self.location} - {self.action_performed}"


