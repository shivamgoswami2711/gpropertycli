import {createReducer} from '@reduxjs/toolkit';
const initialState = {
  property: [],
  coordinates: [],
  current_page: 1,
  total: 0,
  last_page: 0,
  max_price: 0,
  min_price: 0,
  property_type: [],
  propertyadded: [],
  oneproperty: {},
  loading: false,
  uploading: false,
  error: null,
};

export const propertiesReducer = createReducer(initialState, builder => {
  builder
    .addCase('propertiesPageRequest', state => {
      state.loading = true;
    })
    .addCase('propertiesPageSuccess', (state, action) => {
      state.loading = false;
      state.current_page = action.payload.sale_properties.current_page;
      if (state.current_page == 1) {
        state.property = action.payload.sale_properties.data;
      } else {
        state.property = [
          ...state.property,
          ...action.payload.sale_properties.data,
        ];
      }
      state.total = action.payload.sale_properties.total;
      state.last_page = action.payload.sale_properties.last_page;
      state.max_price = action.payload.max_price;
      state.min_price = action.payload.min_price;
      state.property_type = action.payload.property_type;
      state.coordinates = action.payload.coordinates;
    })

    .addCase('propertiesPageFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase('AddNewRequest', state => {
      state.uploading = true;
    })
    .addCase('AddNewSuccess', state => {
      state.uploading = false;
    })
    .addCase('AddNewFail', (state, action) => {
      state.uploading = false;
      state.error = action.payload;
    })
    .addCase('userPropertyRequest', state => {
      state.loading = true;
    })
    .addCase('userPropertySuccess', (state, action) => {
      state.loading = false;
      state.propertyadded = action.payload;
    })
    .addCase('userPropertyFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase('onepropertyRequest', state => {
      state.loading = true;
    })
    .addCase('onepropertySuccess', (state, action) => {
      state.loading = false;
      state.oneproperty = action.payload;
    })
    .addCase('onepropertyFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});
