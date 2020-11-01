import React from 'react';
import styled from 'styled-components';

function PokemonCard({ url, name, width, height }) {
  return (
    <StyledPokemonCard width={width}>
      <img src={url} loading="lazy" alt="" width={width} height={height} />
      <span>{name}</span>
    </StyledPokemonCard>
  );
}

const StyledPokemonCard = styled.div`
  display: inline-block;
  width: ${(props) => props.width};
  text-align: center;
`;

export default PokemonCard;
