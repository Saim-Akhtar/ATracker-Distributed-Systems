require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const { default: axios } = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

async function connectToDB() {
    console.log('Connecting to MongoDB');
    console.log('DATABASE_URL: ', process.env.DATABASE_URL);
    mongoose.connect(process.env.DATABASE_URL).then(() => {
        console.log('Connected to MongoDB');

    
    }).catch(err => {
        console.error(err);
    })
}

connectToDB();


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

app.post('/register', async (req, res) => {
    try {
        console.log('Registering user');
        const {email, password } = req.body;
        
        const response = await axios.post('http://localhost:8080/register', {email, password});

        console.log(response.data);
        
        return res.send({ response: response.data });
    } catch (error) {
        res.send(error);
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const response = await axios.post('http://localhost:8080/login', { email, password });
        // Forward the response from the auth service directly
        res.send(response.data);
    } catch (error) {
        // Forward the actual status code and message from the auth service, if available
        const status = error.response?.status || 500; // Use 500 as a fallback
        const message = error.response?.data?.message || 'Internal Server Error';
        res.status(status).send({ message });
    }
});

app.post('/fetchData', async (req, res) => {
    const token = req.body.token || req.headers.token;

    if (!token) {
        console.log('No token provided');
        return res.status(401).send({ message: 'No token provided.' });
    }

    console.log("Tracker: ", process.env.SECRET_KEY);
    try {
        let url = `http://localhost:8000/tracker/${req.body?.trackingid}`;

        const response =  axios.get(url, {
            headers: {
                Accept: '/',
                'X-Security-Key': process.env.SECURITY_KEY
            }
        })
        res.status(200).json({ message: 'Data fetched successfully', data: response.data });
    
    } catch (error) {
        res.send(error);
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
