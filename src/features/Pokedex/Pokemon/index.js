import React from 'react';
import { useParams } from 'react-router-dom';

function Pokemon() {
  /* using useParams for url slug id */
  const { id } = useParams();
  return <>{id}</>;
}

export default Pokemon;
