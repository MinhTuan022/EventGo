import {createSlice} from '@reduxjs/toolkit';

interface AuthState {
  id: string;
  email: string;
  accessToken: string;
}

const inintialStase: AuthState = {
  id: '',
  email: '',
  accessToken: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authData: inintialStase,
  },
  reducers: {
    addAuth: (state, action) => {
      state.authData = action.payload;
    },
    removeAuth: (state, action) => {
      state.authData = inintialStase;
    },
  },
});

export const authReducer = authSlice.reducer;
export const {addAuth, removeAuth} = authSlice.actions;
export const authSelector = (state: any) => state.authReducer.authData;