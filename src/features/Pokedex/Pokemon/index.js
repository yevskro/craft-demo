import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import GoogleMap from '../../../shared/components/GoogleMap';

import { selectPokemon, fetchPokemon } from '../pokedex.slice';
import PokemonCard from '../PokemonCard';
import PokemonPlaceholder from '../PokemonPlaceholder';

/*
        <GoogleMap
          apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
          center={{ lat: 32.821581, lng: -117.022656 }}
          width="550px"
          height="350px"
          markerLocations={pokemon[id] ? pokemon[id].locations : undefined}
          zoom={9}
        />
        */
function Pokemon() {
  /* using useParams for url slug id */
  const { id } = useParams();
  const dispatch = useDispatch();
  const pokemon = useSelector(selectPokemon);

  useEffect(() => {
    dispatch(fetchPokemon(id));
  }, [id, dispatch]);

  return (
    <Details>
      <Body>
        {pokemon[id] ? (
          <PokemonCard
            url={pokemon[id].url}
            name={pokemon[id].name}
            width="256px"
            height="256px"
          />
        ) : (
          <PokemonPlaceholder />
        )}
        <span>Height: {pokemon[id].height ?? ''}</span>
        <br />
        <span>Weight: {pokemon[id].weight ?? ''}</span>
        <br />
        <span>In Bag</span>
        <input type="checkbox" />
        <br />
        <span>Type</span>
        <ul>
          <li>{pokemon[id].types[0].type.name ?? ''}</li>
          <li>{pokemon[id].types[1].type.name ?? ''}</li>
        </ul>
        <p>
          <em>{pokemon[id].description ?? ''}</em>
        </p>
        <br />
      </Body>
      <Map />
      <Abilities />
    </Details>
  );
}

const Details = styled.div`
  margin-left: 11%;
  margin-right: 11%;
  margin-top: 80px;
  border: 1px solid red;
`;

const Body = styled.div`
  border: 1px solid red;
  display: inline-block;
  width: 40%;
`;

const Map = styled.div`
  border: 1px solid red;
  display: inline-block;
  width: 59%;
`;

const Abilities = styled.div`
  border: 1px solid red;
`;

export default Pokemon;
