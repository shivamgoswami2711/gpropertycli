import { createReducer } from "@reduxjs/toolkit";

//     clearError: (state) => {
//       state.error = null;
//     },
//     clearMessage: (state) => {
//       state.message = null;
//     },

export const homeReducer = createReducer(
  { loading: false, property: [], error: null },
  (builder) => {
    builder
      .addCase("propertyHomeRequest", (state) => {
        state.loading = true;
      })
      .addCase("propertyHomeSuccess", (state, action) => {
        state.loading = false;
        state.property = { ...state.property, ...action.payload };
      })
      .addCase("propertyHomeFail", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
);
