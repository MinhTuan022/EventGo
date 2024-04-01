import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface AuthState {
  id: string;
  email: string;
  accessToken: string;
  favorites: string[];
}

const intialStase: AuthState = {
  id: '',
  email: '',
  accessToken: '',
  favorites: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authData: intialStase,
  },
  reducers: {
    addAuth: (state, action) => {
      state.authData = action.payload;
    },
    removeAuth: state => {
      state.authData = intialStase;
    },
    addFavoriteEvent: (state, action: PayloadAction<string>) => {
      state.authData.favorites.push(action.payload);
    },
    removeFavoriteEvent: (state, action: PayloadAction<string>) => {
      const index = state.authData.favorites.indexOf(action.payload);
      if (index !== -1) {
        state.authData.favorites.splice(index, 1);
      }
    },
  },
});

export const authReducer = authSlice.reducer;
export const {addAuth, removeAuth, addFavoriteEvent, removeFavoriteEvent} =
  authSlice.actions;
export const authSelector = (state: any) => state.authReducer.authData;
// { authReducer: { authData: AuthState } }
