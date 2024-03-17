import axios from 'axios';
import React from 'react';
import { Navbar, Nav, Form, FormControl, Button, Container } from 'react-bootstrap';
// Import Link from react-router-dom
import { Link } from 'react-router-dom';

function Header({ isLoggedIn }) {

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    // Set the logged-in state to false
    window.location.href = '/login';
  }
  const handleSearch = async(trackingid) => {
    // Replace with your API endpoint
    await axios.post('http://localhost:8000/fetchData', {trackingid});
    console.log(response);
    const data = response.data.response;
    if(data.status === 409) {
      setError(data.message);
    }
    else {
      // Redirect to login page if signup is successful
      alert('Signup successful');
      window.location.href = '/login';
    }
  }
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Track Parcel</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto"></Nav>
          <Form className="d-flex flex-grow justify-content-center">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          {isLoggedIn ? (
            // Wrap the button with Link for Logout
            <Link to="/login" className="ms-2">
              <Button variant="outline-danger" as="span" onClick={handleLogout}>Logout</Button>
            </Link>
          ) : (
            // Wrap the button with Link for Login
            <Link to="/login" className="ms-2">
              <Button variant="outline-primary" as="span">Login</Button>
            </Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
