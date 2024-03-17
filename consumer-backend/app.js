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
    const token = req.body.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).send({ message: 'No token provided.' });
    }
    try {
        //Fetch Data from admin-backend
       const response = await axios.get('http://localhost:3000/validate-token', {
           headers: {token}
        });
        
        if(response) {
            res.send({ message: 'Data fetched successfully' }, response.data);
        }
    
    } catch (error) {
        res.status(400).send(error);
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
