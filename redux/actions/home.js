import axios from 'axios';

export const propertyHome =
  (property_type = '', location = '') =>
  async dispatch => {
    try {
      dispatch({type: 'propertyHomeRequest'});
      const {data} = await axios.get(
        `/home?property_type=${property_type}&location=${location}`,
      );
      dispatch({type: 'propertyHomeSuccess', payload: data});
    } catch (error) {
      dispatch({
        type: 'propertyHomeFail',
        payload: error.AxiosError,
      });
    }
  };
export const SearchHome = address => async dispatch => {
  dispatch({type: 'addressSuccess', payload: address});
};
