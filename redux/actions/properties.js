import axios from 'axios';

export const propertiespage =
  (id, param, type = 'buy', location) =>
  async dispatch => {
    const params = {
      price_min: param.min || 0,
      price_max: param.max || 0,
      property_type: param?.property_type || '',
      property_for: param?.propertyFor || '',
      location: param?.location,
    };
    try {
      dispatch({type: 'propertiesPageRequest'});
      const {data} = await axios.get(`/${type}?page=${id}`, {params});
      dispatch({type: 'propertiesPageSuccess', payload: data});
    } catch (error) {
      dispatch({
        type: 'propertiesPageFail',
        payload: error.AxiosError,
      });
    }
  };

export const addNewpropertie = formdata => async dispatch => {
  try {
    dispatch({type: 'AddNewRequest'});
    const {data} = await axios.post(`/addProperty`, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    });
    dispatch({type: 'AddNewSuccess', payload: data});
  } catch (error) {
    dispatch({
      type: 'AddNewFail',
      payload: error.AxiosError,
    });
  }
};

export const updateproperty = formdata => async dispatch => {
  try {
    dispatch({type: 'updatepropertyRequest'});
    const {data} = await axios.post(`/updateproperty`, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    });
    dispatch({type: 'updatepropertySuccess', payload: data});
  } catch (error) {
    dispatch({
      type: 'updatepropertyFail',
      payload: error.AxiosError,
    });
  }
};

export const userproperty =
  ({uid, id}) =>
  async dispatch => {
    try {
      dispatch({type: 'userPropertyRequest'});
      const {data} = await axios.get(`/user_property?uid=${uid}&id=${id}`);
      dispatch({type: 'userPropertySuccess', payload: data});
    } catch (error) {
      dispatch({
        type: 'userPropertyFail',
        payload: error.AxiosError,
      });
    }
  };

export const oneForUpdateproperty =
  ({uid, id}) =>
  async dispatch => {
    try {
      dispatch({type: 'onepropertyRequest'});
      const {data} = await axios.get(`/oneupdateproperty?uid=${uid}&id=${id}`);
      dispatch({type: 'onepropertySuccess', payload: data[0]});
    } catch (error) {
      dispatch({
        type: 'onepropertyFail',
        payload: error.AxiosError,
      });
    }
  };

export const deleteProperty =
  ({uid, id, user_id}) =>
  async dispatch => {
    try {
      dispatch({type: 'userPropertyRequest'});
      const {data} = await axios.get(
        `/deleteProperty?uid=${uid}&id=${id}&user_id=${user_id}`,
      );
      dispatch({type: 'userPropertySuccess', payload: data});
    } catch (error) {
      dispatch({
        type: 'userPropertyFail',
        payload: error.AxiosError,
      });
    }
  };
