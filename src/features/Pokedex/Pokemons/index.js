import React, { useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PokemonCard from '../../../shared/components/PokemonCard';
import PokemonPlaceholder from '../../../shared/components/PokemonPlaceholder';
import PokemonList from '../../../shared/components/PokemonList';
import Search from '../../../shared/components/Search';

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
    if (pokemonsCount < 151) {
      dispatch(fetchPokemons());
    }
  }, [pokemonsCount, dispatch]);

  const pokemonsElements = useCallback(() => {
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
          pokemons.push(
            <Link to={`/pokemon/${keys[idx]}`} key={`pokemon-card-${name}`}>
              <PokemonCard url={url} name={name} width="128px" height="128px" />
            </Link>
          );
        }
      } else if (searchResults[idx]) {
        const { url, name } = searchResults[idx];
        pokemons.push(
          <Link to={`/pokemon/${idx}`} key={`pokemon-card-${name}`}>
            <PokemonCard url={url} name={name} width="128px" height="128px" />
          </Link>
        );
      } else
        pokemons.push(<PokemonPlaceholder key={`pokemon-holder-${idx}`} />);
    }
    return pokemons;
  }, [searchResults, searchPokemonsNamePrefix]);

  function searchCb(e) {
    dispatch(searchPokemonsByNamePrefix(e.target.value));
  }
  const pokemons = useMemo(() => pokemonsElements(), [pokemonsElements]);

  return (
    <>
      <Search search={searchPokemonsNamePrefix} searchCbFn={searchCb} />
      <PokemonList>{pokemons}</PokemonList>
    </>
  );
}

export default Pokemons;
