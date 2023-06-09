import axios from "axios";

export const buypage = (id, param) => async (dispatch) => {
  const params = {
    price_min: param?.price_min,
    price_max: param?.price_max,
    property_type: param?.property_type,
  };
  try {
    dispatch({ type: "buyPageRequest" });
    const data = await axios.get(`/buy?page=${id}`, { params });
    console.log(params)
    console.log(data)
    // dispatch({ type: "buyPageSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "buyPageFail",
      payload: error.AxiosError,
    });
  }
};
