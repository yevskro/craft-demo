import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Switch from '../index';

test('renders without crashing', () => {
  render(<Switch />);
});

test('renders left and right tabs', () => {
  render(<Switch left="left" right="right" />);
  expect(screen.getByText('left')).toBeInTheDocument();
  expect(screen.getByText('right')).toBeInTheDocument();
});

test('invokes onLeftSelected and onRightSelected', () => {
  const onLeftMock = jest.fn();
  const onRightMock = jest.fn();
  render(
    <Switch
      left="left"
      right="right"
      onLeftSelected={onLeftMock}
      onRightSelected={onRightMock}
    />
  );

  /* 
    doesn't matter what text we select, odd amount of clicks should call
    onRightSelected, and even amount of clicks
    should call onLeftSelected, good to check that both tabs handle clicks
  */
  userEvent.click(screen.getByText('right'));
  expect(onRightMock).toHaveBeenCalledTimes(1);
  userEvent.click(screen.getByText('left'));
  expect(onLeftMock).toHaveBeenCalledTimes(1);
});
