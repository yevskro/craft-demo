import React, { useState } from 'react';
import styled from 'styled-components';
import Switch from '../../shared/components/Switch';
import Pokemons from './Pokemons';
import PokeBag from '../Pokebag';

function Pokedex() {
  const [renderPokebag, setRenderPokeBag] = useState(false);

  function handleAll() {
    setRenderPokeBag(false);
  }

  function handleBag() {
    setRenderPokeBag(true);
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
      {renderPokebag ? <PokeBag /> : <Pokemons />}
    </>
  );
}

const SwitchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;

export default Pokedex;
