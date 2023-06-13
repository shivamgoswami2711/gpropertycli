import axios from 'axios';

export const oneproperty = id => async dispatch => {
  try {
    dispatch({type: 'postRequest'});
    const params = {
      id,
    };
    const {data} = await axios.get('/oneproperty', {params});
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
    console.log(data);
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
    dispatch({type: 'contactRequest'});
    const {data} = await axios.post(`/i_am_interested?uid=${dataform.uid}&id=${dataform.id}$&property_id=${dataform.property_id}`);
    console.log(data);
    dispatch({type: 'contactSuccess', payload: data});
  } catch (error) {
    dispatch({
      type: 'contactFail',
      payload: error.AxiosError,
    });
  }
};
export const clearMessage = dataform => async dispatch => {
    dispatch({type: 'clearcontactRequest'});
};
