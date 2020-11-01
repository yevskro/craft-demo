import React from 'react';
import styled from 'styled-components';

function Switch({ left, right, onLeftSelected, onRightSelected }) {
  function handleSwitch(e) {
    const { checked } = e.target;
    if (checked) onRightSelected();
    else onLeftSelected();
  }

  return (
    <StyledSwitch>
      <HiddenCheckbox onClick={(e) => handleSwitch(e)} />
      <Text>{left}</Text>
      <Text>{right}</Text>
    </StyledSwitch>
  );
}

const StyledSwitch = styled.label`
  > input {
    display: none;
  }

  input + span {
    border: 2px solid black;
  }

  span + span {
    border-top: 2px solid black;
    border-right: 2px solid black;
    border-bottom: 2px solid black;
  }

  box-shadow: 2px 5px;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  &:not(:checked) + span {
    background-color: #2196f3;
  }

  &:checked + span + span {
    background-color: #2196f3;
  }
`;

const Text = styled.span`
  padding: 0px 5px 0px 5px;
`;
export default Switch;
