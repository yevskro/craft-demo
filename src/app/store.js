import { configureStore } from '@reduxjs/toolkit';
import pokedexReducer from '../features/Pokedex/pokedex.slice';

const store = configureStore({
  reducer: {
    pokedex: pokedexReducer,
  },
});

export default store;
