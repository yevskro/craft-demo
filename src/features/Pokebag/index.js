import React, { useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PokemonCard from '../../shared/components/PokemonCard';
import PokemonList from '../../shared/components/PokemonList';
import Search from '../../shared/components/Search';

import {
  loadPokemons,
  selectLoadStatus,
  selectSearchPokemonsResults,
  selectSearchPokemonsNamePrefix,
  searchPokemonsByNamePrefix,
} from './pokebag.slice';

function Pokebag() {
  const dispatch = useDispatch();
  const loadStatus = useSelector(selectLoadStatus);
  const searchResults = useSelector(selectSearchPokemonsResults);
  const searchPokemonsNamePrefix = useSelector(selectSearchPokemonsNamePrefix);

  useEffect(() => {
    if (loadStatus === 'idle') dispatch(loadPokemons());
  }, [loadStatus, dispatch]);

  function onSearch(e) {
    /* invoke the search the reducer provies */
    dispatch(searchPokemonsByNamePrefix(e.target.value));
  }

  const pokemonsElements = useCallback(() => {
    /* generate PokemonCards based on searchResults */
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

  /* Memoize so we don't have to compute when there are not changes
  and the user is switching from All to Bag view */
  const pokemons = useMemo(() => pokemonsElements(), [pokemonsElements]);

  return (
    <>
      <Search search={searchPokemonsNamePrefix} onSearch={onSearch} />
      <PokemonList>{pokemons.length ? pokemons : 'empty'}</PokemonList>
    </>
  );
}

export default Pokebag;
