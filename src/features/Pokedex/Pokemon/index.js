import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import GoogleMap from '../../../shared/components/GoogleMap';

import { selectPokemon, fetchPokemon } from '../pokedex.slice';
import PokemonCard from '../../../shared/components/PokemonCard';
import PokemonPlaceholder from '../../../shared/components/PokemonPlaceholder';
import {
  selectAllPokemons,
  addPokemon,
  removePokemon,
} from '../../Pokebag/pokebag.slice';

function Pokemon() {
  /* using useParams for url slug id */
  const { id } = useParams();
  const dispatch = useDispatch();
  const pokemon = useSelector(selectPokemon);
  const baggedPokemons = useSelector(selectAllPokemons);

  useEffect(() => {
    dispatch(fetchPokemon(id));
  }, [id, dispatch]);

  const pokemonLoaded = pokemon[id];

  function handleBag(e) {
    if (e.target.checked) {
      dispatch(addPokemon(pokemon));
    } else dispatch(removePokemon(id));
  }

  return (
    <Details>
      <Body>
        {pokemonLoaded ? (
          <PokemonCard
            url={pokemon[id].url}
            name={pokemon[id].name}
            width="256px"
            height="256px"
          />
        ) : (
          <PokemonPlaceholder />
        )}
        <br />
        <Detail>Height: {pokemonLoaded ? pokemon[id].height : ''}</Detail>
        <br />
        <Detail>Weight: {pokemonLoaded ? pokemon[id].weight : ''}</Detail>
        <br />
        <Detail>In Bag</Detail>
        <input
          type="checkbox"
          onChange={(e) => {
            handleBag(e);
          }}
          checked={!!baggedPokemons[id]}
        />
        <br />
        <Detail>Type</Detail>
        <ListTypes>
          {pokemonLoaded
            ? pokemon[id].types.map(({ type }) => (
                <ListType>{type.name}</ListType>
              ))
            : ''}
        </ListTypes>
        <Description>
          {pokemonLoaded ? pokemon[id].description : ''}
        </Description>
        <br />
      </Body>
      <Map>
        <GoogleMap
          apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
          center={{ lat: 32.821581, lng: -117.022656 }}
          width="600px"
          height="500px"
          markerLocations={pokemonLoaded ? pokemon[id].locations : undefined}
          zoom={9}
        />
      </Map>
      <Abilities>
        <AbilitiesHeader>Abilities</AbilitiesHeader>
        <ListAbilities>
          {pokemonLoaded
            ? pokemon[id].abilities.map(({ ability }) => (
                <ListAbility>
                  <a href={ability.url}>{ability.name}</a>
                </ListAbility>
              ))
            : ''}
        </ListAbilities>
      </Abilities>
    </Details>
  );
}

const ListAbilities = styled.ul`
  margin-left: 35px;
`;
const ListAbility = styled.li`
  text-transform: capitalize;
  margin-top: 30px;
  margin-bottom: 50px;
`;

const AbilitiesHeader = styled.h3`
  margin-top: 15px;
  text-align: center;
`;

const Details = styled.div`
  margin-left: 8%;
  margin-right: 8%;
  margin-top: 70px;
`;

const Detail = styled.span`
  display: inline-block;
  margin-top: 15px;
`;

const Description = styled.p`
  margin-top: 15px;
  font-weight: bold;
  width: 75%;
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
  display: inline-block;
  width: 35%;
  vertical-align: top;
`;

const Map = styled.div`
  display: inline-flex;
  width: 64%;
  justify-content: center;
`;

const Abilities = styled.div``;

export default Pokemon;
