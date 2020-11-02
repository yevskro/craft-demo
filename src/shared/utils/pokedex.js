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

export { filterPokemonsByNamePrefix };
