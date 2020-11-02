import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import PokemonPlaceholder from '..';

test('renders without crashing', () => {
  render(<PokemonPlaceholder />);
});

test('snapshot', async () => {
  const tree = renderer.create(<PokemonPlaceholder />).toJSON();
  expect(tree).toMatchSnapshot();
});
