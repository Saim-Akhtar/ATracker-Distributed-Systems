from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from .models import Action




# Create your views here.

@require_http_methods(["GET"])
def get_tracking_history(request, tracking_id):
    history = list(Action.objects.filter(parcel__tracking_id=tracking_id))
    return JsonResponse({
        "history": history
    })