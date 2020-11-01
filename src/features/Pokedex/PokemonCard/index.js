import React from 'react';
import styled from 'styled-components';

function PokemonCard({ url, name }) {
  return (
    <StyledPokemonCard>
      <img src={url} loading="lazy" alt="" width="128px" height="128px" />
      <span>{name}</span>
    </StyledPokemonCard>
  );
}

const StyledPokemonCard = styled.div`
  display: inline-block;
  width: 128px;
  text-align: center;
`;

export default PokemonCard;
