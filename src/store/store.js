import { configureStore } from '@reduxjs/toolkit';
import drugsSlice from './slices/drugsSlice';

const store = configureStore({
   reducer: {
      drugs: drugsSlice.reducer,
   },
});

export default store;
