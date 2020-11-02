import React, { useState } from 'react';
import styled from 'styled-components';
import Switch from '../../shared/components/Switch';
import Pokemons from './Pokemons';
import PokemonsBag from './PokemonsBag';

function Pokedex() {
  const [renderPokemonsBag, setRenderPokemonsBag] = useState(false);

  function handleAll() {
    setRenderPokemonsBag(false);
  }

  function handleBag() {
    setRenderPokemonsBag(true);
  }

  return (
    <>
      <SwitchContainer>
        <Switch
          left="All"
          right="Bag"
          onLeftSelected={handleAll}
          onRightSelected={handleBag}
        />
      </SwitchContainer>
      {renderPokemonsBag ? <PokemonsBag /> : <Pokemons />}
    </>
  );
}

const SwitchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;

export default Pokedex;
