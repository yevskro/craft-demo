import React, { useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PokemonCard from '../PokemonCard';
import PokemonList from '../PokemonList';
import Search from '../../../shared/components/Search';

import {
  loadPokemons,
  selectLoadStatus,
  selectSearchPokemonsResults,
  selectSearchPokemonsNamePrefix,
  searchPokemonsByNamePrefix,
} from '../pokebag.slice';

function PokemonsBag() {
  const dispatch = useDispatch();
  const loadStatus = useSelector(selectLoadStatus);
  const searchResults = useSelector(selectSearchPokemonsResults);
  const searchPokemonsNamePrefix = useSelector(selectSearchPokemonsNamePrefix);

  useEffect(() => {
    if (loadStatus === 'idle') dispatch(loadPokemons());
  }, [loadStatus, dispatch]);

  function searchCb(e) {
    dispatch(searchPokemonsByNamePrefix(e.target.value));
  }

  const pokemonsElements = useCallback(() => {
    const pokemons = [];
    const keys = Object.keys(searchResults);
    for (let idx = 0; idx < keys.length; idx += 1) {
      const { url, name } = searchResults[keys[idx]];
      pokemons.push(
        <Link to={`/pokemon/${keys[idx]}`} key={`pokemon-card-${name}`}>
          <PokemonCard url={url} name={name} width="128px" height="128px" />
        </Link>
      );
    }
    return pokemons;
  }, [searchResults]);

  const pokemons = useMemo(() => pokemonsElements(), [pokemonsElements]);

  return (
    <>
      <Search search={searchPokemonsNamePrefix} searchCbFn={searchCb} />
      <PokemonList>{pokemons}</PokemonList>
    </>
  );
}

export default PokemonsBag;