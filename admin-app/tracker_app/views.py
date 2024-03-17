import json
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from .models import Action, Parcel
from django.core.serializers import serialize
from django.conf import settings



def custom_auth_required(view_func):
    """
    Decorator to enforce custom authentication based on security key.
    """
    def _wrapped_view(request, *args, **kwargs):
        # Check if the security key is provided in the request headers or parameters
        security_key = request.headers.get('X-Security-Key')  # Assuming security key is provided in headers
        if not security_key:
            # Return unauthorized response if security key is missing
            return JsonResponse({'error': 'Unauthorized'}, status=401)

        # Check if the provided security key is valid
        valid_keys = settings.SECRET_KEY  # Replace 'your_valid_key_here' with your actual valid security key
        if security_key not in valid_keys:
            # Return unauthorized response if the key is invalid
            return JsonResponse({'error': 'Unauthorized'}, status=401)

        # Execute the original view function with parameters
        return view_func(request, *args, **kwargs)

    return _wrapped_view

# Create your views here.

@require_http_methods(["GET"])
@custom_auth_required
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