import axios from "axios";

export const signUp =
  (name, mobile_number, email, password) => async (dispatch) => {
    const body = {
      name: name,
      mobile: mobile_number,
      email: email,
      password: password,
    };

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    dispatch({
      type: "USER_SIGNUP_REQUEST",
    });

    try {
      axios
        .post(`/api/auth/signUp`, body, config)
        .then((res) => {
          dispatch({
            type: "USER_SIGNUP_SUCCESSFULLY",
            payload: res.data.jwtToken,
          });
          localStorage.setItem("jwtToken", res.data.jwtToken);
        })
        .catch((err) => {
          dispatch({
            type: "USER_SIGNUP_FAIL",
            payload: err,
          });
          console.error(err);
        });
    } catch (error) {
      dispatch({
        type: "USER_SIGNUP_FAIL",
        payload: error,
      });
      console.log(error);
    }
  };

export const logIn = (email, password) => async (dispatch) => {
  const body = {
    email,
    password,
  };

  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  dispatch({
    type: "USER_LOGIN_REQUEST",
  });

  try {
    axios
      .post(`/api/auth/login`, body, config)
      .then((res) => {
        dispatch({
          type: "USER_LOGIN_SUCCESSFULLY",
        });
        localStorage.setItem("jwtToken", res.data.jwtToken);
      })
      .catch((err) => {
        dispatch({
          type: "USER_LOGIN_FAIL",
          payload: err.response.data,
        });
      });
  } catch (error) {
    dispatch({
      type: "USER_LOGIN_FAIL",
      payload: error,
    });
    console.log(error);
  }
};

export const userInfoAction = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      "auth-token": localStorage.getItem("jwtToken"),
    },
  };

  dispatch({
    type: "USERINFO_REQUEST",
  });

  try {
    axios
      .get(`/api/auth/getUserInfo`, config)
      .then((res) => {
        dispatch({
          type: "USERINFO_SUCCESSFULLY",
          payload: res.data.userInfo,
        });
        localStorage.setItem("admin", JSON.stringify(res.data.userInfo));
        localStorage.setItem("admin1", JSON.stringify(res.data.userInfo));
      })
      .catch((err) => {
        dispatch({
          type: "USERINFO_FAIL",
          payload: err,
        });
        console.log(err);
      });
  } catch (err) {
    dispatch({
      type: "USERINFO_FAIL",
      payload: err,
    });
    console.log(err);
  }
};
