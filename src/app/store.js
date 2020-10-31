import { configureStore } from '@reduxjs/toolkit';
import pokemonsReducer from '../features/Pokemons/pokemons.slice';

const store = configureStore({
  reducer: {
    pokemons: pokemonsReducer,
  },
});

export default store;
