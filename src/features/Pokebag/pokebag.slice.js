/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { filterBaggedPokemonsByNamePrefix } from '../../shared/utils/pokedex';

const initialState = {
  pokemons: {
    count: 0,
  },
  searchPokemons: { results: {}, namePrefix: '' },
  load: { status: 'idle', error: null },
  add: { status: 'idle', error: null },
  remove: { status: 'idle', error: null },
};

const loadPokemons = createAsyncThunk('pokebag/loadPokemon', async () => {
  const data = JSON.parse(window.localStorage.getItem('pokebag'));
  return { ...data };
});

const addPokemon = createAsyncThunk(
  'pokebag/addPokemon',
  async (pokemon, thunkAPI) => {
    let { pokemons } = thunkAPI.getState().pokebag;
    pokemons = { ...pokemons, ...pokemon };
    pokemons.count += 1;
    window.localStorage.setItem('pokebag', JSON.stringify(pokemons));
    return pokemons;
  }
);

const removePokemon = createAsyncThunk(
  'pokebag/removePokemon',
  async (id, thunkAPI) => {
    let { pokemons } = thunkAPI.getState().pokebag;
    pokemons = { ...pokemons };
    delete pokemons[id];
    pokemons.count -= 1;
    window.localStorage.setItem('pokebag', JSON.stringify(pokemons));
    return pokemons;
  }
);

/* data selectors */
const selectAllPokemons = (state) => state.pokebag.pokemons;
const selectPokemonsCount = (state) => state.pokebag.pokemons.count;
const selectLoadStatus = (state) => state.pokebag.load.status;
const selectLoadError = (state) => state.pokebag.load.error;
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
      state.searchPokemons.results = filterBaggedPokemonsByNamePrefix(
        state.pokemons,
        action.payload
      );
    },
  },
  extraReducers: {
    [loadPokemons.pending]: (state) => {
      state.load.status = 'loading';
    },
    [loadPokemons.fulfilled]: (state, action) => {
      state.load.status = 'succeeded';
      state.pokemons = { ...state.pokemons, ...action.payload };
      console.log(JSON.stringify(state.pokemons));
      state.searchPokemons.results = filterBaggedPokemonsByNamePrefix(
        state.pokemons,
        state.searchPokemons.namePrefix
      );
      console.log(JSON.stringify(state.searchPokemons));
    },
    [loadPokemons.rejected]: (state, action) => {
      state.load.status = 'failed';
      state.load.error = action.error.message;
    },
    [addPokemon.pending]: (state) => {
      state.add.status = 'loading';
    },
    [addPokemon.fulfilled]: (state, action) => {
      state.add.status = 'succeeded';
      state.pokemons = action.payload;
      state.searchPokemons.results = filterBaggedPokemonsByNamePrefix(
        state.pokemons,
        state.searchPokemons.namePrefix
      );
    },
    [addPokemon.rejected]: (state, action) => {
      state.add.status = 'failed';
      state.add.error = action.error.message;
    },
    [removePokemon.pending]: (state) => {
      state.remove.status = 'loading';
    },
    [removePokemon.fulfilled]: (state, action) => {
      state.remove.status = 'succeeded';
      state.pokemons = action.payload;
      state.searchPokemons.results = filterBaggedPokemonsByNamePrefix(
        state.pokemons,
        state.searchPokemons.namePrefix
      );
    },
    [removePokemon.rejected]: (state, action) => {
      state.remove.status = 'failed';
      state.remove.error = action.error.message;
    },
  },
});

const { actions, reducer } = pokebagSlice;
export const { searchPokemonsByNamePrefix } = actions;

export { loadPokemons, addPokemon, removePokemon };
export {
  selectAllPokemons,
  selectPokemonsCount,
  selectLoadStatus,
  selectLoadError,
  selectSearchPokemonsNamePrefix,
  selectSearchPokemonsResults,
};

export default reducer;
