require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./src/models/user.model');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

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
        //await connectToDB();
        const { username, email, password } = req.body;
        const userExists = await User.findOne({ email : email });

        if (userExists) {
            console.log('User already exists');
            return res.send({status: 409, message: 'User already exists' });
        }
        const user = new User({ username, email, password });
        await user.save();

        
        res.send({status: 200, message: 'User registered successfully' });
    } catch (error) {
        // console.log('Error: ', error);
        res.send(error);
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log('email: ', email);
        console.log('password', password);

        const user = await User.findOne({ email });

        console.log('user: ', user); 
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).send({ message: 'Login failed! Check authentication credentials' });
        }
        console.log('user: ', user);
        
        const uuid = uuidv4(); // Generate a new UUID for the token version

        console.log('uuid: ', uuid);
        const token = jwt.sign({
            _id: user._id,
            tokenVersion: uuid
        }, process.env.JWT_SECRET, { expiresIn: '2h' });
        
        user.tokenVersion = uuid;
        await user.save();
        console.log('user: ', user);
        // When issuing a new token, update lastTokenIssueAt like so:
       
        res.send({ token });
    } catch (error) {
        res.status(400).send(error);
    }
});

app.post('/validate-token', async (req, res) => {
    console.log('Validating token');
    // Expecting the token to be sent in the request body or as a header
    const token = req.body.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).send({ message: 'No token provided.' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log('decoded: ', decoded);
        // const uid = mongoose.Types.ObjectId(decoded._id);
        const user = await User.findOne({ _id: decoded._id });

        if (decoded.tokenVersion !== user.tokenVersion) {
            return res.status(401).send({ message: 'Token has been invalidated' });
        }

        res.send({ message: 'Token is valid.', userId: decoded._id });
    } catch (error) {
        console.error('Error: ', error);
        // Determine the type of error (e.g., token expired, invalid token, etc.)
        let errorMessage = 'Unauthorized: Token verification failed.';
        if (error instanceof jwt.TokenExpiredError) {
            errorMessage = 'Unauthorized: Token expired.';
        } else if (error instanceof jwt.JsonWebTokenError) {
            errorMessage = 'Unauthorized: Invalid token.';
        }
        res.status(401).send({ message: errorMessage });
    }
    
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
