import {createReducer} from '@reduxjs/toolkit';

//     clearError: (state) => {
//       state.error = null;
//     },
//     clearMessage: (state) => {
//       state.message = null;
//     },

export const postReducer = createReducer({contactStatus: false}, builder => {
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
    .addCase('clearcontactRequest', (state,_) => {
      state.contactStatus = false;
    });
});
