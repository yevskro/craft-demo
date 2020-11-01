import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import GoogleMap from '../../../shared/components/GoogleMap';

import { selectPokemon, fetchPokemon } from '../pokedex.slice';

function Pokemon() {
  /* using useParams for url slug id */
  const { id } = useParams();
  const dispatch = useDispatch();
  const pokemon = useSelector(selectPokemon);

  useEffect(() => {
    dispatch(fetchPokemon(id));
  }, [id, dispatch]);

  return (
    <>
      <GoogleMap
        apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
        center={{ lat: 32.821581, lng: -117.022656 }}
        width="550px"
        height="350px"
        markerLocations={pokemon[id] ? pokemon[id].locations : undefined}
        zoom={9}
      />
    </>
  );
}

export default Pokemon;
