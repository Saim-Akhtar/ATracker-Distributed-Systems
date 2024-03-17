import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './header.component';

function Home() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <>
        <Header isLoggedIn={loggedIn}/>
        <h1>Welcome to Our Application</h1>
            <p>This is the Home page. You can find various information here.</p>
        <div className="container">
            
        </div>
    </>
  );
}

export default Home;
