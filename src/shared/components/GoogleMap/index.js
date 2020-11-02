import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

function Map({ center, markerLocations, width, height, zoom }) {
  /* markerLocations are an array of lat and lng strings separate
  by a comma. ie. [['232.32','-323'],['32.23', '177.232']] */
  function markerElements() {
    return markerLocations.map((location) => {
      const [lat, lng] = location.split(',');
      return (
        <Marker
          position={{
            lat: Number(lat),
            lng: Number(lng),
          }}
          key={`${lat}-${lng}`}
        />
      );
    });
  }

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}>
      <GoogleMap
        mapContainerStyle={{ width, height }}
        center={center}
        zoom={zoom}
      >
        {markerLocations ? markerElements() : ''}
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(Map);
