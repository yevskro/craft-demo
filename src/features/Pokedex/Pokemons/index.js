import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import PokemonCard from '../PokemonCard';
import PokemonPlaceholder from '../PokemonPlaceholder';

import {
  selectPokemonsCount,
  selectSearchPokemonsResults,
  selectSearchPokemonsNamePrefix,
  searchPokemonsByNamePrefix,
  fetchPokemons,
} from '../pokedex.slice';

function Pokemons({ bagged }) {
  const dispatch = useDispatch();
  const pokemonsCount = useSelector(selectPokemonsCount);
  const searchResults = useSelector(selectSearchPokemonsResults);
  const searchPokemonsNamePrefix = useSelector(selectSearchPokemonsNamePrefix);

  useEffect(() => {
    /* 
      downloads the appropriate amount of 
      batches of pokemon info(name, url) 
    */
    if (bagged) {
      // place holder for reading bagged pokemons
    } else if (pokemonsCount !== 151) {
      dispatch(fetchPokemons());
    }
  }, [pokemonsCount, bagged, dispatch]);

  function pokemonsElements() {
    let from = 1;
    let to = 151;
    let keys;
    const pokemons = [];
    if (searchPokemonsNamePrefix !== '') {
      keys = Object.keys(searchResults);
      from = 0;
      to = keys.length - 1;
    }

    for (let idx = from; idx <= to; idx += 1) {
      if (keys) {
        if (searchResults[keys[idx]]) {
          const { url, name } = searchResults[keys[idx]];
          pokemons.push(<PokemonCard url={url} name={name} />);
        }
      } else if (searchResults[idx]) {
        const { url, name } = searchResults[idx];
        pokemons.push(<PokemonCard url={url} name={name} />);
      } else pokemons.push(<PokemonPlaceholder />);
    }
    return pokemons;
  }

  return (
    <>
      <SearchContainer>
        <input
          type="text"
          onChange={(e) => dispatch(searchPokemonsByNamePrefix(e.target.value))}
          value={searchPokemonsNamePrefix}
        />
      </SearchContainer>
      <PokemonContainer>{bagged || pokemonsElements()}</PokemonContainer>
    </>
  );
}

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25px;
`;

const PokemonContainer = styled.div`
  margin-top: 10px;
  text-align: center;

  @media (min-width: 400px) {
    margin-left: 5%;
    margin-right: 5%;
  }

  @media (min-width: 700px) {
    margin-left: 11%;
    margin-right: 11%;
  }
`;

export default Pokemons;