import React from 'react';
import { useParams } from 'react-router-dom';

function Pokemon() {
  const { id } = useParams();
  return <>{id}</>;
}

export default Pokemon;
