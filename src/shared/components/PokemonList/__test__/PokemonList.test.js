import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import PokemonList from '..';

test('renders without crashing', () => {
  render(<PokemonList />);
});

test('renders children', () => {
  render(<PokemonList>test</PokemonList>);
  expect(screen.getByText('test')).toBeInTheDocument();
});

test('snapshot', async () => {
  const tree = renderer.create(<PokemonList>test</PokemonList>).toJSON();
  expect(tree).toMatchSnapshot();
});
