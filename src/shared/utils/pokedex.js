/* eslint-disable import/prefer-default-export */
function filterPokemonsByNamePrefix(pokemons, prefix) {
  const obj = {};
  for (let idx = 1; idx <= pokemons.count; idx += 1) {
    const subString = pokemons[idx].name.substring(0, prefix.length);
    /* enforce case insensitivity */
    if (subString.toUpperCase() === prefix.toUpperCase()) {
      obj[idx] = pokemons[idx];
    }
  }
  return obj;
}

/* eslint-disable import/prefer-default-export */
function filterBaggedPokemonsByNamePrefix(pokemons, prefix) {
  const obj = {};
  const keys = Object.keys(pokemons);
  for (let idx = 0; idx < keys.length; idx += 1) {
    if (Number(keys[idx])) {
      const subString = pokemons[keys[idx]].name.substring(0, prefix.length);
      /* enforce case insensitivity */
      if (subString.toUpperCase() === prefix.toUpperCase()) {
        obj[keys[idx]] = pokemons[keys[idx]];
      }
    }
  }
  return obj;
}

export { filterPokemonsByNamePrefix, filterBaggedPokemonsByNamePrefix };
