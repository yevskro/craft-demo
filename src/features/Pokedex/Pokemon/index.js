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
        {pokemon.id ? (
          <PokemonCard
            url={pokemon.url}
            name={pokemon.name}
            width="256px"
            height="256px"
          />
        ) : (
          <PokemonPlaceholder />
        )}
        <br />
        <Detail>Height: {pokemon.height ?? ''}</Detail>
        <br />
        <Detail>Weight: {pokemon.weight ?? ''}</Detail>
        <br />
        <Detail>In Bag</Detail>
        <input type="checkbox" />
        <br />
        <Detail>Type</Detail>
        <ListTypes>
          {pokemon.id
            ? pokemon.types.map(({ type }) => <ListType>{type.name}</ListType>)
            : ''}
        </ListTypes>
        <Description>{pokemon.description ?? ''}</Description>
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

const Detail = styled.span`
  display: inline-block;
  margin-top: 15px;
`;

const Description = styled.p`
  margin-top: 15px;
  font-weight: bold;
  width: 60%;
`;

const ListTypes = styled.ul`
  display: inline-block;
`;

const ListType = styled.li`
  display: inline-block;
  text-transform: capitalize;
  margin-left: 10px;
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
