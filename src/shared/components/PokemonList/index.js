import React from 'react';
import styled from 'styled-components';

function PokemonList({ children }) {
  return <StyledPokemonList>{children}</StyledPokemonList>;
}
const StyledPokemonList = styled.div`
  margin-top: 10px;
  text-align: center;

  @media (min-width: 400px) {
    /* tablet view */
    margin-left: 5%;
    margin-right: 5%;
  }

  @media (min-width: 700px) {
    /* desktop view */
    margin-left: 11%;
    margin-right: 11%;
  }
`;

export default PokemonList;
