import axios from 'axios';
import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(''); // State to store the error message

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        // Reset error state on each submission attempt
        setError('');

        if(password !== confirmPassword) {
            // Set the error message state if passwords do not match
            setError('Passwords do not match');
            return;
        }
        
        // Simulate a signup process
        try {
            // Replace with your API endpoint
            const response = await axios.post('http://localhost:8083/register', {email, password});

            console.log(response);
            
            const data = response.data.response;
            if(data.status === 409) {
                setError(data.message);
                // Redirect to login page if signup is successful
            }
            else {
                alert('Signup successful');
                window.location.href = '/login';
            }
            // Optionally, redirect the user or clear the form
        } catch (error) {
            console.error(error.response); // This will give you more insight into the error
            const errorMessage = error.response.data.message || 'Something went wrong, please try again.';
            setError(errorMessage);
        }
        //console.log('Signup successful with email:', email);
        // Reset form fields after successful signup
        // setEmail('');
        // setPassword('');
        // setConfirmPassword('');
        // Optionally, you can handle redirection or further success actions here
    }

    return (
        <Container>
            <h2>Signup</h2>
            {error && <Alert variant="danger">{error}</Alert>} {/* Display the error message if there is an error */}
            <Form onSubmit={handleSignup}> {/* Changed to onSubmit for form */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmail}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={handlePassword}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={handleConfirmPassword}/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Signup
                </Button>
            </Form>
        </Container>
    );
}

export default Signup;
