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

async function getPokemons(from, to) {
  const pokemons = {};
  const promises = [];
  for (let c = from; c <= to; c += 1) {
    // eslint-disable-next-line no-await-in-loop
    promises.push(
      fetch(`${POKEMON_API_URL}/${c}`, {
        method: 'GET',
        headers: DEFAULT_HEADERS,
        mode: 'cors',
      })
        .then((response) => response.json())
        .then((data) => {
          pokemons[c] = {};
          pokemons[c].name = data.name;
          pokemons[c].url = data.sprites.front_default;
        })
    );
  }
  await Promise.all(promises);
  return pokemons;
}

// eslint-disable-next-line import/prefer-default-export
export { getPokemons };
