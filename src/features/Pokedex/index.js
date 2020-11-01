import React, { useState } from 'react';
import styled from 'styled-components';
import Switch from '../../shared/components/Switch';
import Pokemons from './Pokemons';
import BaggedPokemons from './BaggedPokemons';

function Pokedex() {
  const [renderBaggedPokemons, setRenderBaggedPokemons] = useState(false);

  function handleAll() {
    setRenderBaggedPokemons(false);
  }

  function handleBag() {
    setRenderBaggedPokemons(true);
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
      {renderBaggedPokemons ? <BaggedPokemons /> : <Pokemons />}
    </>
  );
}

const SwitchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;

export default Pokedex;
