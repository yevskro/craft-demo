import React, { useEffect } from 'react';
// import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPokemonsCount,
  selectSearchResults,
  searchByNamePrefix,
  fetchPokemons,
} from './pokemons.slice';

function Pokemons() {
  const dispatch = useDispatch();
  const pokemonsCount = useSelector(selectPokemonsCount);
  const searchResults = useSelector(selectSearchResults);

  useEffect(() => {
    /* 
      downloads the appropriate amount of 
      batches of pokemon info(name, url) 
    */
    if (pokemonsCount !== 151) {
      dispatch(fetchPokemons());
    }
  }, [pokemonsCount, dispatch]);

  const imgs = [];
  const keys = Object.keys(searchResults);
  for (let idx = 0; idx < keys.length; idx += 1) {
    imgs.push(
      <img src={searchResults[keys[idx]].url} key={idx} alt="" loading="lazy" />
    );
  }

  return (
    <>
      <input
        type="text"
        onChange={(e) => dispatch(searchByNamePrefix(e.target.value))}
      />
      <br />
      {imgs}
    </>
  );
}

export default Pokemons;
