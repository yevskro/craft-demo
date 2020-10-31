import React, { useEffect } from 'react';
// import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAllPokemons,
  selectPokemonsCount,
  selectFetchStatus,
  fetchPokemons,
} from './pokemons.slice';

function Pokemons() {
  const dispatch = useDispatch();
  const pokemons = useSelector(selectAllPokemons);
  const pokemonsCount = useSelector(selectPokemonsCount);
  const fetchStatus = useSelector(selectFetchStatus);

  useEffect(() => {
    /* 
      downloads the appropriate amount of 
      batches of pokemon info(name, url) 
    */
    if (fetchStatus === 'idle' && pokemonsCount !== 151) {
      dispatch(fetchPokemons());
    }
  }, [fetchStatus, pokemonsCount, dispatch]);

  const imgs = [];
  for (let idx = 1; idx <= pokemonsCount; idx += 1) {
    imgs.push(<img src={pokemons[idx].url} key={idx} alt="" loading="lazy" />);
  }

  return <>{imgs}</>;
}

export default Pokemons;
