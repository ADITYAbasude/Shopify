import axios from "axios";

export const createOrderAction = (amount, currency) => async (dispatch) => {
  const body = {
    amount,
    currency,
  };

  dispatch({
    type: "CREATE_ORDER_REQUEST",
  });

  try {
    axios
      .post(
        `/api/paymentGateway/createOrder`,
        body
      )
      .then((res) => {
        dispatch({
          type: "CREATE_ORDER_SUCCESSFUL",
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "CREATE_ORDER_FAIL",
          payload: err,
        });
        console.log(err);
      });
  } catch (error) {
    dispatch({
      type: "CREATE_ORDER_FAIL",
      payload: error,
    });
    console.log(error);
  }
};
