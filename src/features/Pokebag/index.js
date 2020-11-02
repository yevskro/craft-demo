import React, { useEffect /* useMemo, useCallback */ } from 'react';
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
    dispatch(searchPokemonsByNamePrefix(e.target.value));
  }

  function pokemonsElements() {
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
  }

  const pokemons = pokemonsElements();
  console.log(searchResults);
  return (
    <>
      <Search search={searchPokemonsNamePrefix} onSearch={onSearch} />
      <PokemonList>{pokemons}</PokemonList>
    </>
  );
}

export default Pokebag;
