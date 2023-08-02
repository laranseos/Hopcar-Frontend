import React, { useState, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import GMap from './GMap';

// API key of the google map
const GOOGLE_MAP_API_KEY = 'AIzaSyD7ty-xDsUacpF-7Gt7fAjNCMCwEcKOhhs';
const Ride = () => {
  const [loadMap, setLoadMap] = useState(false);

  useEffect(() => {
    const options = {
      apiKey: GOOGLE_MAP_API_KEY,
      version: "weekly",
      libraries: ['geometry']
    };

    new Loader(options).load().then(() => {
      setLoadMap(true);
    }).catch(e => {
      console.error('Sorry, something went wrong: Please try again later. Error:', e);
    });
  }, []);

  return (
    <div>
      {!loadMap ? <div>Loading...</div> : <GMap />}
    </div>
  );
}

export default Ride;
