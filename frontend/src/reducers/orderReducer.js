export const productOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case "ORDER_REQUEST":
      return {
        status: true,
      };
    case "ORDER_SUCCESSFUL":
      return {
        status: false,
        orderSave: action.payload,
      };
    case "ORDER_FAIL":
      return {
        status: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const getUserOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_USER_ORDER_REQUEST":
      return {
        status: true,
      };
    case "GET_USER_ORDER_SUCCESSFUL":
      return {
        status: false,
        orders: action.payload,
      };
    case "GET_USER_ORDER_FAIL":
      return {
        status: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
