import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';
import Search from '../index';

test('renders without crashing', () => {
  render(<Search />);
});

test('renders search with placeholder', () => {
  render(<Search />);
  expect(screen.getByPlaceholderText('search')).toBeInTheDocument();
});

test('renders search with search text', () => {
  render(<Search search="test" />);
  expect(screen.getByDisplayValue('test')).toBeInTheDocument();
});

test('invokes onSearch when typing search', () => {
  const onSearchMock = jest.fn();

  render(<Search search="" onSearch={onSearchMock} />);

  userEvent.type(screen.getByPlaceholderText('search'), 'test');
  expect(onSearchMock).toHaveBeenCalledTimes(4);
});

test('snapshot', async () => {
  const onSearchMock = jest.fn();
  const tree = renderer
    .create(<Search search="" onSearch={onSearchMock} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
