from django.urls import path
from . import views

urlpatterns = [
    path('tracker/<str:tracking_id>', views.get_tracking_history, name="get_tracking_history")
]