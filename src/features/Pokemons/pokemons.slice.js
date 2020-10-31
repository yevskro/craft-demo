/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPokemons } from '../../shared/api';

const initialState = {
  data: {
    count: 0,
  } /* data will represent pokemons, count will keep track of pokemons in the data */,
  fetch: { status: 'idle', error: null } /* fetch info */,
};

const fetchPokemons = createAsyncThunk(
  'pokemons/fetchPokemons',
  // eslint-disable-next-line no-unused-vars
  async (_, thunkApi) => {
    const {
      count,
    } = thunkApi.getState().pokemons.data; /* get the current count */
    let pokemons;

    if (count === 150) {
      /* if the count is 150 then we only need to get one more */
      pokemons = await getPokemons(151, 1);
      return { ...pokemons, count: 151 };
    }

    /* count works in relation with pokemon id, the
      starting index of the pokemon we get is count + 1,
      and we wish to download the next 10 */
    pokemons = await getPokemons(count + 1, 10);
    return { ...pokemons, count: count + 10 };
  }
);

/* data accessors */
const selectAllPokemons = (state) => state.pokemons.data;
const selectPokemonsCount = (state) => state.pokemons.data.count;
const selectFetchStatus = (state) => state.pokemons.fetch.status;
const selectFetchError = (state) => state.pokemons.fetch.error;
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
export {
  selectAllPokemons,
  selectPokemonsCount,
  selectFetchStatus,
  selectFetchError,
};
