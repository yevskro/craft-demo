import { configureStore } from '@reduxjs/toolkit';
import pokedexReducer from '../features/Pokedex/pokedex.slice';
import pokebagReducer from '../features/Pokedex/pokebag.slice';

const store = configureStore({
  reducer: {
    pokedex: pokedexReducer,
    pokebag: pokebagReducer,
  },
});

export default store;
