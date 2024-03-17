import json
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from .models import Action, Parcel
from django.core.serializers import serialize




# Create your views here.

@require_http_methods(["GET"])
def get_tracking_history(request, tracking_id):
    try:
        parcel = Parcel.objects.prefetch_related('actions').get(tracking_id=tracking_id)
    except Parcel.DoesNotExist:
        return JsonResponse({'error': 'Parcel not found'}, status=404)

    print(parcel)   

    serialized_actions = serialize('json', parcel.actions.all())

    actions = json.loads(serialized_actions)


    parcel_data = {
        'id': parcel.id,
        'tracking_id': parcel.tracking_id,
        'user_email': parcel.user_email,
        'detail': parcel.detail,
        'created_at': parcel.created_at.strftime('%Y-%m-%d %H:%M:%S'),
        'departure': parcel.departure,
        'destination': parcel.destination,
        'actions': actions,
    }
    return JsonResponse(parcel_data, safe=False)