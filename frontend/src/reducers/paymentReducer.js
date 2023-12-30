export const createOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case "CREATE_ORDER_REQUEST":
      return {
        status: true,
      };
    case "CREATE_ORDER_SUCCESSFUL":
      return {
        status: false,
        orderResult: action.payload,
      };
    case "CREATE_ORDER_FAIL":
      return {
        status: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
