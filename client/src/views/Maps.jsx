/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// react plugin used to create google maps
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps';
// reactstrap components
import { Card, Container, Row } from 'reactstrap';

// react plugin for datetime
import Moment from 'react-moment';

// core components
import Header from 'components/Headers/Header.jsx';

import feel1 from '../assets/img/icons/feel/feel-1.PNG';
import feel2 from '../assets/img/icons/feel/feel-2.PNG';
import feel3 from '../assets/img/icons/feel/feel-3.PNG';
import feel4 from '../assets/img/icons/feel/feel-4.PNG';
import feel5 from '../assets/img/icons/feel/feel-5.PNG';

function Map() {
  const [selectedData, setSelectedData] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const sensor = () => axios.get('/api/sensor');
  useEffect(() => {
    sensor().then(res => {
      setSelectedData(res.data.sensorLocData);
    });
  }, []);

  useEffect(() => {
    const listener = e => {
      if (e.key === 'Escape') {
        setSelectedMarker(null);
      }
    };
    window.addEventListener('keydown', listener);

    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, []);
  console.log('render >>>', selectedData);

  return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: 19.027286, lng: 99.900246 }}
      defaultOptions={{
        scrollwheel: false
      }}
    >
      {selectedData != null
        ? selectedData.map((data, index) => (
            <Marker
              key={index}
              position={{
                lat: data.lat,
                lng: data.long
              }}
              onClick={() => {
                setSelectedMarker(data);
              }}
              icon={{
                url: `http://maps.google.com/mapfiles/ms/icons/${
                  data.avgPm25 <= 50
                    ? 'ltblue-dot'
                    : data.avgPm25 <= 100
                    ? 'green-dot'
                    : data.avgPm25 <= 200
                    ? 'yellow-dot'
                    : data.avgPm25 <= 300
                    ? 'orange-dot'
                    : 'red-dot'
                }.png`
              }}
            />
          ))
        : ''}
      {selectedMarker && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedMarker(null);
          }}
          position={{
            lat: selectedMarker.lat,
            lng: selectedMarker.long
          }}
        >
          <div>
          <div className="text-center">
                <img
                  src={`${
                    selectedMarker.avgPm25 <= 50
                      ? feel1
                      : selectedMarker.avgPm25 <= 100
                      ? feel2
                      : selectedMarker.avgPm25 <= 200
                      ? feel3
                      : selectedMarker.avgPm25 <= 300
                      ? feel4
                      : feel5
                  }`}
                  width="110"
                  height="82"
                />
              </div>
            <div className="text-center">
                <h4>PM2.5 : {selectedMarker.avgPm25}</h4>
                <h5>{`${
                    selectedMarker.avgPm25 <= 50
                      ? 'Good'
                      : selectedMarker.avgPm25 <= 100
                      ? 'Moderate'
                      : selectedMarker.avgPm25 <= 200
                      ? 'Unhealthy'
                      : 'Hazardous'
                  }`}</h5>
              </div>
            <div className="text-center">
              <p>
                <strong>Lat:</strong> {selectedMarker.lat}
              </p>
              <p>
                <strong>Long:</strong> {selectedMarker.long}
              </p>
            </div>
            <div className="text-center">
              Lastet Time:{' '}
              <Moment format="D MMM YYYY, H:m" withTitle>
                {selectedMarker.lastedTimestamp}
              </Moment>
            </div>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const MapWrapper = withScriptjs(withGoogleMap(Map));

class Maps extends React.Component {
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow border-0">
                <MapWrapper
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA3HB2XOBjkvNkEZ7Yb09Dfu48lSxPePno"
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={
                    <div
                      style={{ height: `600px` }}
                      className="map-canvas"
                      id="map-canvas"
                    />
                  }
                  mapElement={
                    <div style={{ height: `100%`, borderRadius: 'inherit' }} />
                  }
                />
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default Maps;
