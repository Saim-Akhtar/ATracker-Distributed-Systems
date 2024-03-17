const parcelData = {
    "id": 1,
    "tracking_id": "2bcb3ae617",
    "user_email": "test@test.com",
    "detail": "charger",
    "created_at": "2024-03-17 14:18:25",
    "departure": "Oulu, Finland",
    "destination": "Talin, Estonia",
    "actions": [
      {
        "model": "tracker_app.action",
        "pk": 2,
        "fields": {
          "status": "Pending",
          "location": "Oulu, Finland",
          "action_performed": "Parcel created",
          "comments": "",
          "parcel": 1
        }
      },
      {
        "model": "tracker_app.action",
        "pk": 3,
        "fields": {
          "status": "In Transit",
          "location": "Oulu, Finland",
          "action_performed": "Parcel dispatched",
          "comments": "Heading to Helsinki",
          "parcel": 1
        }
      },
      {
        "model": "tracker_app.action",
        "pk": 4,
        "fields": {
          "status": "In Transit",
          "location": "Helsinki, Finland",
          "action_performed": "Parcel arrived",
          "comments": "Awaiting next transport to Estonia",
          "parcel": 1
        }
      },
      {
        "model": "tracker_app.action",
        "pk": 5,
        "fields": {
          "status": "In Transit",
          "location": "Tallinn, Estonia",
          "action_performed": "Parcel arrived",
          "comments": "Clearing customs",
          "parcel": 1
        }
      },
      {
        "model": "tracker_app.action",
        "pk": 6,
        "fields": {
          "status": "Delivered",
          "location": "Tallinn, Estonia",
          "action_performed": "Parcel delivered",
          "comments": "Delivered to recipient",
          "parcel": 1
        }
      }
    ]
  }