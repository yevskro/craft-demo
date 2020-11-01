import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { selectPokemon, fetchPokemon } from '../pokedex.slice';

function Pokemon() {
  /* using useParams for url slug id */
  const { id } = useParams();
  const dispatch = useDispatch();
  const pokemon = useSelector(selectPokemon);

  useEffect(() => {
    dispatch(fetchPokemon(id));
  }, [id, dispatch]);

  return <>{JSON.stringify(pokemon)}</>;
}

export default Pokemon;
