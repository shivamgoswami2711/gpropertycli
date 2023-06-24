import {createReducer} from '@reduxjs/toolkit';

const initialState = {
  profile: {},
  recentlyViewData: [],
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
      state.loading = false;
      state.error = action.payload;
    })
    .addCase('recentlyviewRequest', state => {
      state.loading = true;
    })
    .addCase('recentlyviewSuccess', (state, action) => {
      state.loading = false;
      if (action.payload.current_page == 1) {
        state.recentlyViewData = action.payload.data;
      } else {
        state.recentlyViewData = [...state.recentlyViewData, action.payload.data];
      }
    })
    .addCase('recentlyviewFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});
