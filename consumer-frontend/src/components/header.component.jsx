import axios from 'axios';

import React from 'react';
import { Navbar, Nav, Form, FormControl, Button, Container } from 'react-bootstrap';
// Import Link from react-router-dom
import { Link } from 'react-router-dom';

function Header({ isLoggedIn, setParcelData }) {
  const [trackingid, setTrackingId] = React.useState('');

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    // Set the logged-in state to false
    window.location.href = '/login';
  }

  const handleSearchForm = (e) => {
    e.preventDefault();
    setTrackingId(e.target.value);

   
  }
  const handleSearch = async() => {
    // Replace with your API endpoint
    try {
      
      console.log('Tracking ID: ', trackingid);
      if(trackingid === '') { return; }

      const response = await axios.post('http://localhost:8083/fetchData', 
      {trackingid}, 
      { headers: { token: localStorage.getItem('token') } }
    );
    
      setParcelData(response.data.data);
      console.log(response.data.data);
      // const data = response.data.response;
      
      } catch (error) {
        
      }
  }

  console.log('Tracking ID: ', trackingid);
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
              value={trackingid}
              onChange={(e) => handleSearchForm(e)}
            />
            <Button variant="outline-success" onClick={handleSearch}>Search</Button>
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
