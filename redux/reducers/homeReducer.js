import {createReducer} from '@reduxjs/toolkit';

//     clearError: (state) => {
//       state.error = null;
//     },
//     clearMessage: (state) => {
//       state.message = null;
//     },

export const homeReducer = createReducer(
  {
    loading: false,
    search: '',
    coordinates: [],
    rent: [],
    sell: [],
    error: null,
    address:"",
  },
  builder => {
    builder
      .addCase('propertyHomeRequest', state => {
        state.loading = true;
      })
      .addCase('propertyHomeSuccess', (state, action) => {
        state.loading = false;
        state.max_price = action.payload.max_price;
        state.min_price = action.payload.min_price;
        state.rent = action.payload.rent;
        state.sell = action.payload.sell;
        state.property_type = action.payload.property_type;
        state.coordinates = action.payload.coordinates;
      })
      .addCase('propertyHomeFail', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('addressSuccess', (state, action) => {
        state.loading = false;
        state.address = action.payload;
      });
  },
);
