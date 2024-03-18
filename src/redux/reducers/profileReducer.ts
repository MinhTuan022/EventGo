
import { createSlice } from '@reduxjs/toolkit';
interface ProfileState {
  id: string;

}
const initialState: ProfileState = {
  id: ''
};

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profileData: initialState,
  },
  reducers: {
    setProfileData: (state, action) => {
      state.profileData = action.payload;
    },
    clearProfileData: (state) => {
      state.profileData = initialState;
    }
  }
});
export const profileReducer =  profileSlice.reducer;
export const { setProfileData, clearProfileData } = profileSlice.actions;

export const profileSelector = (state:  any) => state.profileReducer.profileData;