/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPokemons } from '../../shared/api';

const initialState = {
  data: { count: 0 },
  status: 'idle',
  error: null,
};

const fetchPokemons = createAsyncThunk(
  'pokemons/fetchPokemons',
  // eslint-disable-next-line no-unused-vars
  async (_, thunkApi) => {
    const { count } = thunkApi.getState().pokemons.data;
    let pokemons;
    if (count === 150) {
      pokemons = await getPokemons(150, 151);
      return { ...pokemons, count: 151 };
    }

    pokemons = await getPokemons(count + 1, count + 10);
    return { ...pokemons, count: count + 10 };
  }
);

const selectAllPokemons = (state) => state.pokemons.data;
const selectPokemonsCount = (state) => state.pokemons.data.count;
const selectFetchStatus = (state) => state.pokemons.status;
// const selectPokemonById = (state, id) => 1;

const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  extraReducers: {
    [fetchPokemons.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchPokemons.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.data = { ...state.data, ...action.payload };
    },
    [fetchPokemons.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export default pokemonsSlice;
export { fetchPokemons };
export { selectAllPokemons, selectFetchStatus, selectPokemonsCount };
