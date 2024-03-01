import { authReducer } from './reducers/authReducer';
import {configureStore} from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
   authReducer, 
  },
});

export default store;
