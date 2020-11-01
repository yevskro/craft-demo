import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPokemonsCount,
  selectSearchPokemonsResults,
  selectSearchPokemonsNamePrefix,
  searchPokemonsByNamePrefix,
  fetchPokemons,
} from '../pokedex.slice';

function Pokemons() {
  const dispatch = useDispatch();
  const pokemonsCount = useSelector(selectPokemonsCount);
  const searchResults = useSelector(selectSearchPokemonsResults);
  const searchPokemonsNamePrefix = useSelector(selectSearchPokemonsNamePrefix);

  useEffect(() => {
    /* 
      downloads the appropriate amount of 
      batches of pokemon info(name, url) 
    */
    if (pokemonsCount !== 151) {
      dispatch(fetchPokemons());
    }
  }, [pokemonsCount, dispatch]);

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
          pokemons.push(
            <img
              src={searchResults[keys[idx]].url}
              key={keys[idx]}
              alt=""
              loading="lazy"
            />
          );
        }
      } else if (searchResults[idx]) {
        pokemons.push(
          <img src={searchResults[idx].url} key={idx} alt="" loading="lazy" />
        );
      } else pokemons.push(<PokemonPlaceholder key={idx} />);
    }
    return pokemons;
  }

  return (
    <>
      <input
        type="text"
        onChange={(e) => dispatch(searchPokemonsByNamePrefix(e.target.value))}
        value={searchPokemonsNamePrefix}
      />
      <br />
      {pokemonsElements()}
    </>
  );
}

const PokemonPlaceholder = styled.div`
  display: inline-block;
  width: 94px;
  height: 94px;
  border: 1px solid white;
  background-color: rgba(225, 225, 225, 0.8);
`;

export default Pokemons;
