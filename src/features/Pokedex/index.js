import React from 'react';
import styled from 'styled-components';
import Switch from '../../shared/components/Switch';

function Pokedex() {
  function handleAll() {
    console.log('all');
  }

  function handleBag() {
    console.log('bag');
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
    </>
  );
}

const SwitchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;

export default Pokedex;
