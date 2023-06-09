import axios from "axios";

export const oneproperty = (id) => async (dispatch) => {
  try {
    dispatch({ type: "postRequest" });
    const params = {
      id,
    };
    const { data } = await axios.get("/oneproperty", { params });
    console.log(data)
    dispatch({ type: "postSuccess", payload: data });
  } catch (error) {
    console.log("dlfkgjfdkg")
    dispatch({
      type: "postFail",
      payload: error.AxiosError,
    });
  }
};

