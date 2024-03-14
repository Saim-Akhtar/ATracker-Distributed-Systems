from django.contrib import admin
from tracker_app.models import Parcel, Action

# Register your models here.
@admin.register(Parcel)
class ParcelAdmin(admin.ModelAdmin):
    readonly_fields = ['tracking_id']

@admin.register(Action)
class ActionAdmin(admin.ModelAdmin):
    pass