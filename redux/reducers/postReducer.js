import {createReducer} from '@reduxjs/toolkit';

//     clearError: (state) => {
//       state.error = null;
//     },
//     clearMessage: (state) => {
//       state.message = null;
//     },

export const postReducer = createReducer(
  {contactStatus: false, recently_view_check: []},
  builder => {
    builder
      .addCase('postRequest', state => {
        state.loading = true;
      })
      .addCase('postSuccess', (state, action) => {
        state.loading = false;
        state.property = action.payload;
      })
      .addCase('postFail', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('contactRequest', state => {
        state.loading = true;
      })
      .addCase('contactSuccess', (state, action) => {
        state.loading = false;
        state.contactStatus = action.payload.save;
      })
      .addCase('contactFail', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('recently_view_checkRequest', state => {
        state.loading = true;
      })
      .addCase('recently_view_checkSuccess', (state, action) => {
        state.loading = false;
        state.recently_view_check = action.payload.recently_view_check;
      })
      .addCase('recently_view_checkFail', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('clearcontactRequest', (state, _) => {
        state.contactStatus = false;
      });
  },
);
