export const signUpReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_SIGNUP_SUCCESSFULLY":
      return {
        loading: false,
        token: action.payload,
      };
    case "USER_SIGNUP_REQUEST":
      return { loading: true };
    case "USER_SIGNUP_FAIL":
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const logInReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_LOGIN_SUCCESSFULLY":
      return {
        loading: false,
        token: action.payload,
      };
    case "USER_LOGIN_REQUEST":
      return { loading: true };
    case "USER_LOGIN_FAIL":
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const userInfoReduce = (state = {}, action) => {
  switch (action.type) {
    case "USERINFO_SUCCESSFULLY":
      return {
        loading: false,
        data: action.payload,
      };
    case "USERINFO_REQUEST":
      return { loading: true };
    case "USERINFO_FAIL":
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
