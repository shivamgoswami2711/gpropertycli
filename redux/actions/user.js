import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getuser = uid => async dispatch => {
  try {
    dispatch({type: 'loginRequest'});
    const {data} = await axios.get(`/getuser?uid=${uid}`);
    dispatch({type: 'loginSuccess', payload: data[0]});
  } catch (error) {
    dispatch({
      type: 'loginFail',
      payload: error.AxiosError,
    });
  }
};
export const setuser = data => async dispatch => {
  try {
    dispatch({type: 'loginSuccess', payload: data[0]});
  } catch (error) {
    dispatch({
      type: 'loginFail',
      payload: error,
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
    dispatch({type: 'loginSuccess', payload: data[0]});
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
export const updatenumber = (olduid,uid,number) => async dispatch => {
  try {
    dispatch({type: 'UpdateUserRequest'});
    const {data} = await axios.post(`/updatenumber?olduid=${olduid}&uid=${uid}&contact_number=${number}`)
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem('profile', jsonValue);
    dispatch({type: 'UpdateUserSuccess', payload: data[0]});
  } catch (error) {
    console.log(error)
    dispatch({
      type: 'UpdateUserFail',
      payload: error.AxiosError,
    });
  }
};

export const recentlyView =
  ({id, uid, pageid}) =>
  async dispatch => {
    try {
      dispatch({type: 'recentlyviewRequest'});
      const {data} = await axios.post(
        `/recently_view?page=${pageid}&id=${id}&uid=${uid}`,
      );
      dispatch({type: 'recentlyviewSuccess', payload: data.recently_viewed});
    } catch (error) {
      dispatch({
        type: 'recentlyviewFail',
        payload: error.AxiosError,
      });
    }
  };

export const changePropertyFor = (id, property_for) => async dispatch => {
  try {
    dispatch({type: 'changePropertyForRequest'});
    const {data} = await axios.get(
      `/change_property_for?&id=${id}&property_for=${property_for}`,
    );
    dispatch({type: 'changePropertyForSuccess', payload: data});
  } catch (error) {
    dispatch({
      type: 'changePropertyForFail',
      payload: error.AxiosError,
    });
  }
};
