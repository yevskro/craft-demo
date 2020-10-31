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
    if (fetchStatus === 'idle') {
      dispatch(fetchPokemons());
    } else if (fetchStatus === 'succeeded') {
      if (pokemonsCount !== 151) dispatch(fetchPokemons());
    }
  }, [fetchStatus, pokemonsCount, dispatch]);

  const imgs = [];
  for (let idx = 1; idx <= pokemonsCount; idx += 1) {
    imgs.push(<img src={pokemons[idx].url} key={idx} alt="" />);
  }

  return <>{imgs}</>;
}

export default Pokemons;
