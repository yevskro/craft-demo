/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { filterPokemonsByNamePrefix } from '../../shared/utils/pokedex';
import { getPokemons, getPokemon } from '../../shared/utils/api';

const initialState = {
  pokemons: {
    count: 0,
  },
  /* baggedPokemons: {
    count: 0,
  }, */
  pokemon: {},
  searchPokemons: { results: {}, namePrefix: '' },
  // searchBaggedPokemons: { results: {}, namePrefix: '' },
  fetch: { status: 'idle', error: null } /* fetch info */,
  // loadStorage: { status: 'idle', error: null },
};

const fetchPokemon = createAsyncThunk('pokedex/fetchPokemon', async (id) => {
  return getPokemon(id);
});

const fetchPokemons = createAsyncThunk(
  'pokedex/fetchPokemons',
  // eslint-disable-next-line no-unused-vars
  async (_, thunkApi) => {
    const {
      count,
    } = thunkApi.getState().pokedex.pokemons; /* get the current count */
    let fetchedPokemons;

    if (count === 150) {
      /* if the count is 150 then we only need to get one more */
      fetchedPokemons = await getPokemons(151, 1);
      return { ...fetchedPokemons, count: 151 };
    }

    /* count works in relation with pokemon id, the
      starting index of the pokemon we get is count + 1,
      and we wish to download the next 10 */
    fetchedPokemons = await getPokemons(count + 1, 10);
    return { ...fetchedPokemons, count: count + 10 };
  }
);

/* data selectors */
const selectAllPokemons = (state) => state.pokedex.pokemons;
const selectPokemonsCount = (state) => state.pokedex.pokemons.count;
const selectFetchStatus = (state) => state.pokedex.fetch.status;
const selectFetchError = (state) => state.pokedex.fetch.error;
const selectSearchPokemonsResults = (state) =>
  state.pokedex.searchPokemons.results;
const selectSearchPokemonsNamePrefix = (state) =>
  state.pokedex.searchPokemons.namePrefix;
const selectPokemon = (state) => state.pokedex.pokemon;

const pokedexSlice = createSlice({
  name: 'pokedex',
  initialState,
  reducers: {
    searchPokemonsByNamePrefix: (state, action) => {
      state.searchPokemons.namePrefix = action.payload;
      state.searchPokemons.results = filterPokemonsByNamePrefix(
        state.pokemons,
        action.payload
      );
    },
  },
  extraReducers: {
    [fetchPokemons.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchPokemons.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.pokemons = { ...state.pokemons, ...action.payload };
      state.searchPokemons.results = filterPokemonsByNamePrefix(
        state.pokemons,
        state.searchPokemons.namePrefix
      );
    },
    [fetchPokemons.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [fetchPokemon.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchPokemon.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.pokemon = { ...action.payload };
    },
    [fetchPokemon.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

const { actions, reducer } = pokedexSlice;
export const { searchPokemonsByNamePrefix } = actions;

export { fetchPokemons, fetchPokemon };
export {
  selectAllPokemons,
  selectPokemonsCount,
  selectFetchStatus,
  selectFetchError,
  selectSearchPokemonsNamePrefix,
  selectSearchPokemonsResults,
  selectPokemon,
};

export default reducer;
