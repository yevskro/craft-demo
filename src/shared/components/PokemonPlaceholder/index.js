import React from 'react';
import styled from 'styled-components';

function PokemonPlaceholder() {
  return (
    <StyledPokemonPlaceholder>
      <ImagePlaceholder />
      <NamePlaceholder />
    </StyledPokemonPlaceholder>
  );
}

const StyledPokemonPlaceholder = styled.div`
  width: 96px;
  display: inline-block;
`;

const ImagePlaceholder = styled.div`
  box-sizing: border-box;
  border: 15px solid white;
  width: 96px;
  height: 96px;
  background-color: rgba(233, 233, 233, 0.8);
`;

const NamePlaceholder = styled.div`
  box-sizing: border-box;
  background-color: rgba(233, 233, 233, 0.8);
  height: 19px;
  width: 96px;
  border: 5px solid white;
`;
export default PokemonPlaceholder;
