/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { filterPokemonsByNamePrefix } from '../../shared/utils/pokemons';
import { getPokemons } from '../../shared/utils/api';

const initialState = {
  data: {
    count: 0,
  } /* data will represent pokemons, count will keep track of pokemons in the data */,
  search: { results: {}, namePrefix: '' },
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
    pokemons = await getPokemons(count + 1, 25);
    return { ...pokemons, count: count + 25 };
  }
);

/* data selectors */
const selectAllPokemons = (state) => state.pokemons.data;
const selectPokemonsCount = (state) => state.pokemons.data.count;
const selectFetchStatus = (state) => state.pokemons.fetch.status;
const selectFetchError = (state) => state.pokemons.fetch.error;
const selectSearchResults = (state) => state.pokemons.search.results;
const selectSearchNamePrefix = (state) => state.pokemons.search.namePrefix;

const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    searchByNamePrefix: (state, action) => {
      state.search.namePrefix = action.payload;
      state.search.results = filterPokemonsByNamePrefix(
        state.data,
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
      state.data = { ...state.data, ...action.payload };
      state.search.results = filterPokemonsByNamePrefix(
        state.data,
        state.search.namePrefix
      );
    },
    [fetchPokemons.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

const { actions, reducer } = pokemonsSlice;
export const { searchByNamePrefix } = actions;

export { fetchPokemons };
export {
  selectAllPokemons,
  selectPokemonsCount,
  selectFetchStatus,
  selectFetchError,
  selectSearchNamePrefix,
  selectSearchResults,
};

export default reducer;
