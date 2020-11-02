import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Switch from '../../shared/components/Switch';
import Pokemons from './Pokemons';
import Pokebag from '../Pokebag';

function Pokedex({ bag }) {
  const history = useHistory();

  function handleAll() {
    history.push('/');
  }

  function handleBag() {
    history.push('/bag');
  }

  return (
    <>
      <SwitchContainer>
        <Switch
          left="All"
          right="Bag"
          onLeftSelected={handleAll}
          onRightSelected={handleBag}
          preselectRight={!!bag}
        />
      </SwitchContainer>
      {bag ? <Pokebag /> : <Pokemons />}
    </>
  );
}

const SwitchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;

export default Pokedex;
