import React, { useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PokemonCard from '../../../shared/components/PokemonCard';
import PokemonPlaceholder from '../../../shared/components/PokemonPlaceholder';
import PokemonList from '../../../shared/components/PokemonList';
import Search from '../../../shared/components/Search';
import {
  MAX_POKEMONS,
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
    /* 
      optimizing here a bit, 
      a search is done everytime there is a batch
      request regardless if the user wants to search,
      it just searches by an empty string to get all.
      if this is the case we can loop through searchResults
      from 1...MAX_POKEMON, indecies that are not set
      represent place holders.
      if there is a search the results may not be sequential
      so we have to use the Object.keys()
    */
    let from = 1;
    let to = MAX_POKEMONS;
    let keys;
    const pokemons = [];
    if (searchPokemonsNamePrefix !== '') {
      keys = Object.keys(searchResults);
      /* looping through the keys array instead of
      sequentially through the indecies of the searchResults */
      from = 0;
      to = keys.length - 1;
    }

    for (let idx = from; idx <= to; idx += 1) {
      if (keys) {
        /* search is in progress, handle searchResults which holds
        non-sequential data */
        if (searchResults[keys[idx]]) {
          const { url, name } = searchResults[keys[idx]];
          pokemons.push(
            <Link to={`/pokemon/${keys[idx]}`} key={`pokemon-card-${name}`}>
              <PokemonCard url={url} name={name} width="128px" height="128px" />
            </Link>
          );
        }
      } else if (searchResults[idx]) {
        /* there is no search in progress, searchResults holds sequential data */
        const { url, name } = searchResults[idx];
        pokemons.push(
          <Link to={`/pokemon/${idx}`} key={`pokemon-card-${name}`}>
            <PokemonCard url={url} name={name} width="128px" height="128px" />
          </Link>
        );
      } else {
        /* there is no search, the data is sequential, empty data at index */
        pokemons.push(<PokemonPlaceholder key={`pokemon-holder-${idx}`} />);
      }
    }
    return pokemons;
  }, [searchResults, searchPokemonsNamePrefix]);

  function onSearch(e) {
    dispatch(searchPokemonsByNamePrefix(e.target.value));
  }
  const pokemons = useMemo(() => pokemonsElements(), [pokemonsElements]);

  return (
    <>
      <Search search={searchPokemonsNamePrefix} onSearch={onSearch} />
      <PokemonList>{pokemons}</PokemonList>
    </>
  );
}

export default Pokemons;
