import React from 'react';
import styled from 'styled-components';

function Switch({
  left,
  right,
  onLeftSelected /* on when the left switch is selected */,
  onRightSelected /* on when the right switch is selected */,
  preselectRight /* select right switch on initial load */,
}) {
  function handleSwitch(e) {
    /*
      a checked value means right switch is selected
      a non checked value means left switch is selecte
    */
    const { checked } = e.target;
    if (checked) onRightSelected();
    else onLeftSelected();
  }

  return (
    <StyledSwitch>
      <HiddenCheckbox
        onChange={(e) => handleSwitch(e)}
        checked={preselectRight}
      />
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
