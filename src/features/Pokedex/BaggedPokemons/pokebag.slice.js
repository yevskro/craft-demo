/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { filterPokemonsByNamePrefix } from '../../../shared/utils/pokedex';

const initialState = {
  baggedPokemons: {
    count: 0,
  },
  searchBaggedPokemons: { results: {}, namePrefix: '' },
  storage: { status: 'idle', error: null },
};

const loadPokemons = createAsyncThunk('pokebag/loadPokemon', async () => {
  return { test: 'test' };
});

const addPokemon = createAsyncThunk('pokebag/addPokemon', async (id) => {
  return { test: 'test' };
});

const removePokemon = createAsyncThunk('pokebag/removePokemon', async (id) => {
  return { test: 'test' };
});

/* data selectors */
const selectAllPokemons = (state) => state.pokebag.pokemons;
const selectPokemonsCount = (state) => state.pokebag.pokemons.count;
const selectStorageStatus = (state) => state.pokebag.storage.status;
const selectStorageError = (state) => state.pokebag.storage.error;
const selectSearchPokemonsResults = (state) =>
  state.pokebag.searchPokemons.results;
const selectSearchPokemonsNamePrefix = (state) =>
  state.pokebag.searchPokemons.namePrefix;

const pokebagSlice = createSlice({
  name: 'pokebag',
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
    [loadPokemons.pending]: (state) => {
      state.status = 'loading';
    },
    [loadPokemons.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.pokemons = { ...state.pokemons, ...action.payload };
      state.searchPokemons.results = filterPokemonsByNamePrefix(
        state.pokemons,
        state.searchPokemons.namePrefix
      );
    },
    [loadPokemons.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [addPokemon.pending]: (state) => {
      state.status = 'loading';
    },
    [addPokemon.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.pokemons = { ...state.pokemons, ...action.payload };
      state.searchPokemons.results = filterPokemonsByNamePrefix(
        state.pokemons,
        state.searchPokemons.namePrefix
      );
    },
    [addPokemon.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [removePokemon.pending]: (state) => {
      state.status = 'loading';
    },
    [removePokemon.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.pokemons = { ...state.pokemons };
      delete state.pokemons[action.payload];
      state.searchPokemons.results = filterPokemonsByNamePrefix(
        state.pokemons,
        state.searchPokemons.namePrefix
      );
    },
    [removePokemon.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

const { actions, reducer } = pokebagSlice;
export const { searchPokemonsByNamePrefix } = actions;

export { loadPokemons };
export {
  selectAllPokemons,
  selectPokemonsCount,
  selectStorageStatus,
  selectStorageError,
  selectSearchPokemonsNamePrefix,
  selectSearchPokemonsResults,
};

export default reducer;
