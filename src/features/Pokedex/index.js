import React from 'react';
import Toggle from 'react-styled-toggle';
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
      <Switch
        left="All"
        right="Bag"
        onLeftSelected={handleAll}
        onRightSelected={handleBag}
      />
      <Toggle />
    </>
  );
}

export default Pokedex;
