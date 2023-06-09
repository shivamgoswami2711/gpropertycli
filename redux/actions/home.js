import axios from "axios";

export const propertyHome = (type) => async (dispatch) => {
  try {
    dispatch({ type: "propertyHomeRequest" });
    const params = {
      property_for: type,
    };
    const { data } = await axios.get("/property", { params });
    dispatch({ type: "propertyHomeSuccess", payload: {[type]:data} });
  } catch (error) {
    dispatch({
      type: "propertyHomeFail",
      payload: error.AxiosError,
    });
  }
};