import { createReducer } from "@reduxjs/toolkit";
const initialState = {
  buy: [],
  current_page: 1,
  total: 0,
  last_page: 0,
  max_price: 0,
  min_price: 0,
  property_type: [],
  loading: false,
  error: null,
};

export const buyReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("buyPageRequest", (state) => {
      state.loading = true;
    })
    .addCase("buyPageSuccess", (state, action) => {
      state.loading = false;
      state.current_page = action.payload.sale_properties.current_page;
      if (state.current_page == 1) {
        state.buy = action.payload.sale_properties.data;
      } else {
        state.buy = [...state.buy, ...action.payload.sale_properties.data];
      }
      state.total = action.payload.sale_properties.total;
      state.last_page = action.payload.sale_properties.last_page;
      state.max_price = action.payload.max_price;
      state.min_price = action.payload.min_price;
      state.property_type = action.payload.property_type;
    })
    .addCase("buyPageFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});
