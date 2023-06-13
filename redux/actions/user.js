import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const propertiespage = id => async dispatch => {

  try {
    dispatch({type: 'propertiesPageRequest'});
    const {data} = await axios.get(`/user_name_img?id==${id}`);
    dispatch({type: 'propertiesPageSuccess', payload: data});
  } catch (error) {
    dispatch({
      type: 'propertiesPageFail',
      payload: error.AxiosError,
    });
  }
};

export const LoginAction = formdata => async dispatch => {
  try {
    dispatch({type: 'loginRequest'});
    const {data} = await axios.post(`/adduser`, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    });
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem('profile', jsonValue);
    dispatch({type: 'loginSuccess', payload: data});
  } catch (error) {
    dispatch({
      type: 'loginFail',
      payload: error.AxiosError,
    });
  }
};

export const localLoginAction = id => async dispatch => {
  try {
    const formdata = new FormData();
    formdata.append('uid', id);
    dispatch({type: 'loginRequest'});
    const {data} = await axios.post(`/adduser`, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    });
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem('profile', jsonValue);
    dispatch({type: 'loginSuccess', payload: data[0]});
  } catch (error) {
    dispatch({
      type: 'loginFail',
      payload: error.AxiosError,
    });
  }
};

export const userUpdate = formdata => async dispatch => {
  try {
    dispatch({type: 'UpdateUserRequest'});
    const {data} = await axios.post(`/userupdate`, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    });
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem('profile', jsonValue);
    dispatch({type: 'UpdateUserSuccess', payload: data[0]});
  } catch (error) {
    dispatch({
      type: 'UpdateUserFail',
      payload: error.AxiosError,
    });
  }
};

export const recentlyView =
  ({id, uid, pageid}) =>
  async dispatch => {
    const params = {
      id,
      uid,
      pageid,
    };
    try {
      dispatch({type: 'recentlyviewRequest'});
      const {data} = await axios.post(`/recently_view?page=${pageid}`, {params});
      dispatch({type: 'recentlyviewSuccess', payload: data});
    } catch (error) {
      dispatch({
        type: 'recentlyviewFail',
        payload: error.AxiosError,
      });
    }
  };
