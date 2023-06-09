import {createReducer} from '@reduxjs/toolkit';

const initialState = {
  profile: {},
  loading: false,
  error: null,
};

export const userReducer = createReducer(initialState, builder => {
  builder
    .addCase('loginRequest', state => {
      state.loading = true;
    })
    .addCase('loginSuccess', (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    })
    .addCase('loginFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase('UpdateUserRequest', state => {
      state.loading = true;
    })
    .addCase('UpdateUserSuccess', (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    })
    .addCase('UpdateUserFail', (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.error = action.payload;
    });
});
