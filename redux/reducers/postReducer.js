import { createReducer } from "@reduxjs/toolkit";


//     clearError: (state) => {
//       state.error = null;
//     },
//     clearMessage: (state) => {
//       state.message = null;
//     },



export const postReducer = createReducer({}, (builder) => {
  builder
    .addCase("postRequest", (state) => {
      state.loading = true;
    })
    .addCase("postSuccess", (state, action) => {
      state.loading = false;
      state.property = action.payload;
    })
    .addCase("postFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});
