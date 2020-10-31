// eslint-disable-next-line no-unused-vars
const SAN_DEIGO_MAP_API_URL = 'https://api.craft-demo.net/pokemon';
const POKEMON_API_KEY = 'HHko9Fuxf293b3w56zAJ89s3IcO9D5enaEPIg86l';
const POKEMON_API_URL = 'https://pokeapi.co/api/v2/pokemon-form';

const DEFAULT_HEADERS = {
  'content-type': 'application/json',
};

// eslint-disable-next-line no-unused-vars
const SAN_DIEGO_DEFAULT_HEADERS = {
  ...DEFAULT_HEADERS,
  'x-api-key': POKEMON_API_KEY,
};

// eslint-disable-next-line import/prefer-default-export
export { getPokemons };
