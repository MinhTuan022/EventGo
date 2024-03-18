import { authReducer } from './reducers/authReducer';
import {configureStore} from '@reduxjs/toolkit';
import { profileReducer } from './reducers/profileReducer';
// import profileReducer from './reducers/profileReducer';

const store = configureStore({
  reducer: {
   authReducer, 
   profileReducer
  },
});

export default store;
