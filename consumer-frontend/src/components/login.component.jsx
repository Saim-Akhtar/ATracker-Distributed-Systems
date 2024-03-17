import React, { useState} from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

const handleSignin = async (e) => {

    e.preventDefault();

    try {
        const response = await axios.post('http://localhost:8083/login', { email, password });

        // Redirect to home page if login is successful
        if(response.data.token) {
            window.location.href = '/';
        }
        localStorage.setItem('token', response.data.token);
        console.log(response.data);
      } catch (error) {
        console.error(error.response.data); // This will give you more insight into the error
    }
      
};

const handleEmail = (e) => {
    setEmail(e.target.value);
}

const handlePassword = (e) => {
    setPassword(e.target.value);
}
return (
<Container>
    <h2>Login</h2>
    <Form>
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={handleEmail}/>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={handlePassword}/>
    </Form.Group>

    <Button variant="primary" type="submit" onClick={handleSignin}>
        Login
    </Button>
    </Form>

    <div>
        <p>Don't have an account? <a href="/signup">Signup</a></p>
    </div>
    </Container>
    );
    
}

export default Login;
