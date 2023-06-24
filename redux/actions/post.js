import axios from 'axios';

export const oneproperty = id => async dispatch => {
  try {
    dispatch({type: 'postRequest'});

    const {data} = await axios.get(`/oneproperty?id=${id}`);
    dispatch({type: 'postSuccess', payload: data});
  } catch (error) {
    dispatch({
      type: 'postFail',
      payload: error.AxiosError,
    });
  }
};

export const contactForm = dataform => async dispatch => {
  try {
    dispatch({type: 'contactRequest'});
    const {data} = await axios.post(
      `/send_mail_to_owner?uid=${dataform.uid}&name=${dataform.name}$&address=${dataform.address}&contact_number=${dataform.contact_number}&property_id=${dataform.property_id}`,
    );
    dispatch({type: 'contactSuccess', payload: data});
  } catch (error) {
    dispatch({
      type: 'contactFail',
      payload: error.AxiosError,
    });
  }
};

export const I_am_interested = dataform => async dispatch => {
  try {
    await axios.post(
      `/i_am_interested?uid=${dataform.uid}&id=${dataform.id}&property_id=${dataform.property_id}`,
    );
  } catch (error) {
    dispatch({
      type: 'contactFail',
      payload: error.AxiosError,
    });
  }
};

export const I_amnt_interested = dataform => async dispatch => {
  try {
    await axios.get(
      `/i_amnt_interested?uid=${dataform.uid}&id=${dataform.id}&property_id=${dataform.property_id}`,
    );
  } catch (error) {
    dispatch({
      type: 'contactFail',
      payload: error.AxiosError,
    });
  }
};

export const Recently_view_check = dataform => async dispatch => {
  try {
    dispatch({type: 'recently_view_checkRequest'});
    const {data} = await axios.get(
      `/recently_view_check?uid=${dataform.uid}&id=${dataform.id}&property_id=${dataform.property_id}`,
    );
    dispatch({type: 'recently_view_checkSuccess', payload: data});
  } catch (error) {
    dispatch({
      type: 'recently_view_checkFail',
      payload: error.AxiosError,
    });
  }
};

export const clearMessage = dataform => async dispatch => {
  dispatch({type: 'clearcontactRequest'});
};
