import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import PokemonCard from '..';

test('renders without crashing', () => {
  render(<PokemonCard />);
});

test('renders image', () => {
  render(<PokemonCard src="" name="test" alt="bubba" />);
  expect(screen.getByAltText('pokemon card test')).toBeInTheDocument();
});

test('snapshot', async () => {
  const tree = renderer
    .create(
      <PokemonCard src="" name="test" alt="bubba" width="96px" height="96px" />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
