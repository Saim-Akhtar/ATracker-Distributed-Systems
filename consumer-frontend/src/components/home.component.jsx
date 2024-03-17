/* eslint-disable react/prop-types */
import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './header.component';
import moment from 'moment';

const TimelineItem = ({ data }) => (
  <div className="timeline-item">
    <div className="timeline-dot"></div>
    <div className="timeline-date">{data.fields.action_performed} on {moment(data.fields.created_at).format('DD/MM/YYYY HH:mm')}</div>
    <div className="timeline-content">
      <h3>{data.fields.status}</h3>
      <p>{data.fields.location}</p>
      <p>{data.fields.comments}</p>
    </div>
  </div>
);

function Home() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [parcelData, setParcelData] = React.useState();

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      setLoggedIn(true);
    }
  }, []);

  console.log('Parcel Data HOME: ', parcelData);
  localStorage.setItem('parcelData', JSON.stringify(parcelData));
  // console.log('Parcel Data: ', parcelData.parcelData);
  return (
    <>
        <Header isLoggedIn={loggedIn} setParcelData={setParcelData}/>
        

        <div className="tracking-container">
      <h2>Parcel Tracking Information</h2>
      
      
      {parcelData !== undefined && <div className="timeline">
        {parcelData.actions.map((action, index) => (
          <TimelineItem key={index} data={action} />
        ))}
      </div> } 
    </div>
    </>
  );
}

export default Home;
