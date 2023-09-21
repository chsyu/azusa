import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer';

// Part2: Combine Reducers and Create a Store
const store = configureStore({
   reducer: {
     root: rootReducer,
   },
  //  devTools: process.env.NODE_ENV !== 'production',
 });

//  export store to global
export default store;