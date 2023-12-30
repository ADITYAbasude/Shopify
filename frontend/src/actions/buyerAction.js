import axios from "axios";

export const getBuyerProducts = (productType) => async (dispatch) => {
  const config = {
    headers: {
      "content-type": "application/json",
    },
  };

  dispatch({
    type: "GET_PRODUCT_REQUEST",
  });

  try {
    axios
      .get(
        `http://localhost:5000/api/product/getProducts/${productType}`,
        config
      )
      .then((res) => {
        dispatch({
          type: "GET_PRODUCT_SUCCESSFUL",
          payload: res.data.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "GET_PRODUCT_FAIL",
          payload: err,
        });
      });
  } catch (err) {
    dispatch({
      type: "GET_PRODUCT_FAIL",
      payload: err,
    });
  }
};

export const getProductDetail = (productId) => async (dispatch) => {
  const config = {
    headers: {
      "content-type": "application/json",
    },
  };

  dispatch({
    type: "GET_PRODUCT_DETAIL_REQUEST",
  });

  try {
    axios
      .get(
        `http://localhost:5000/api/product/productDetail/${productId}`,
        config
      )
      .then((res) => {
        dispatch({
          type: "GET_PRODUCT_DETAIL_SUCCESSFUL",
          payload: res.data.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "GET_PRODUCT_DETAIL_FAIL",
          payload: err,
        });
      });
  } catch (error) {
    dispatch({
      type: "GET_PRODUCT_DETAIL_FAIL",
      payload: error,
    });
  }
};

export const giveReviewsAction =
  (productId, name, rating, comment) => async (dispatch) => {
    const config = {
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("jwtToken"),
      },
    };

    const body = {
      name,
      rating,
      comment,
    };

    dispatch({
      type: "REVIEW_REQUEST",
    });
    try {
      axios
        .post(
          `http://localhost:5000/api/product/${productId}/rating`,
          body,
          config
        )
        .then((res) => {
          dispatch({
            type: "REVIEW_SUCCESSFULLY",
            payload: res.data.message,
          });
        })
        .catch((err) => {
          dispatch({
            type: "REVIEW_FAIL",
            payload: err.response.data.message,
          });
        });
    } catch (error) {
      dispatch({
        type: "REVIEW_FAIL",
        payload: error,
      });
    }
  };

export const addToTheCartAction =
  (productId, title, amount, stock, image) => async (dispatch) => {
    const config = {
      headers: {
        "auth-token": localStorage.getItem("jwtToken"),
        "content-type": "application/json",
      },
    };
    const body = {
      title,
      amount,
      stock,
      image,
    };
    dispatch({
      type: "USER_REQUEST_TO_ADD_THE_CART",
    });

    try {
      axios
        .post(
          `http://localhost:5000/api/product/addCart/${productId.id}`,
          body,
          config
        )
        .then((res) => {
          dispatch({
            type: "USER_REQUEST_TO_ADD_THE_CART_SUCCESSFUL",
            payload: res.data.message,
          });
        })
        .catch((err) => {
          dispatch({
            type: "USER_REQUEST_TO_ADD_THE_CART_FAIL",
            payload: err.response,
          });
        });
    } catch (err) {
      dispatch({
        type: "USER_REQUEST_TO_ADD_THE_CART_FAIL",
        payload: err,
      });
    }
  };

export const getProductFromCartAction = () => (dispatch) => {
  const config = {
    headers: {
      "auth-token": localStorage.getItem("jwtToken"),
      "content-type": "application/json",
    },
  };
  dispatch({
    type: "GET_CARD_LIST_REQUEST",
  });
  try {
    axios
      .get(`http://localhost:5000/api/product/cardList`, config)
      .then((res) => {
        dispatch({
          type: "GET_CARD_LIST_SUCCESSFUL",
          payload: res.data,
        });
        localStorage.setItem("carts", res.data.length);
      })
      .catch((err) => {
        dispatch({
          type: "GET_CARD_LIST_FAIL",
          payload: err.response,
        });
      });
  } catch (error) {
    dispatch({
      type: "GET_CARD_LIST_FAIL",
      payload: error,
    });
  }
};

export const deleteCart = (productId) => (dispatch) => {
  const config = {
    headers: {
      "auth-token": localStorage.getItem("jwtToken"),
      "content-type": "application/json",
    },
  };

  dispatch({
    type: "DELETE_CART_REQUEST",
  });

  try {
    axios
      .delete(
        `http://localhost:5000/api/product/deleteCart/${productId}`,
        config
      )
      .then((res) => {
        dispatch({
          type: "DELETE_CART_SUCCESSFUL",
          payload: res.data.products,
        });
      })
      .catch((err) => {
        dispatch({
          type: "DELETE_CART_FAIL",
          payload: err,
        });
      });
  } catch (error) {
    dispatch({
      type: "DELETE_CART_FAIL",
      payload: error,
    });
  }
};

export const updateCartAction = (quantity, productId) => (dispatch) => {
  const config = {
    headers: {
      "auth-token": localStorage.getItem("jwtToken"),
      "content-type": "application/json",
    },
  };
  const body = {
    quantity,
  };
  dispatch({
    type: "UPDATE_CART_REQUEST",
  });

  try {
    axios
      .put(
        `http://localhost:5000/api/product/updateQuantity/${productId}`,
        body,
        config
      )
      .then((res) => {
        dispatch({
          type: "UPDATE_CART_SUCCESSFUL",
          payload: res.data.products,
        });
      })
      .catch((err) => {
        dispatch({
          type: "UPDATE_CART_FAIL",
          payload: err,
        });
      });
  } catch (error) {
    dispatch({
      type: "UPDATE_CART_FAIL",
      payload: error,
    });
  }
};

export const getRandProductAction = () => async (dispatch) => {
  dispatch({
    type: "RAND_PRODUCT_REQUEST",
  });
  const config = {
    headers: {
      "content-type": "application/json",
    },
  };
  const body = {};
  try {
    axios
      .get("http://localhost:5000/api/product/randProduct", body, config)
      .then((res) => {
        dispatch({
          type: "RAND_PRODUCT_SUCCESSFUL",
          payload: res.data[0],
        });
      })
      .catch((err) => {
        dispatch({
          type: "RAND_PRODUCT_FAIL",
          payload: "Check your internet connection",
        });
      });
  } catch (error) {
    dispatch({
      type: "RAND_PRODUCT_FAIL",
      payload: "Check your internet connection",
    });
  }
};
