from django.contrib import admin
from tracker_app.models import Parcel, Action, StatusChoices

# Register your models here.
@admin.register(Parcel)
class ParcelAdmin(admin.ModelAdmin):
    readonly_fields = ['tracking_id']

    def save_model(self, request, obj, form, change):
        # Save the parent instance
        super().save_model(request, obj, form, change)

        # Create related child instances
        Action.objects.create(
            status=StatusChoices.PENDING,
            location=obj.departure,  # Set the initial location as needed
            action_performed='Parcel created',
            parcel=obj  # Associate the action with the created parcel
        )

@admin.register(Action)
class ActionAdmin(admin.ModelAdmin):
    pass