import React, { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { Button, createTheme, TextField, ThemeProvider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { sellerLogin } from "../../actions/sellerAction";
import { toast, ToastContainer } from "react-toastify";
import Loading from "../../components/Loader";
const SellerLogin = () => {
  const sellerToken = localStorage.getItem("sellerToken");
  const history = useNavigate();
  const theme1 = createTheme({
    typography: {
      button: {
        textTransform: "none",
      },
    },
  });
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.sellerLogIn);
  function createErrorToast(error) {
    toast.error(error, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  useEffect(() => {
    if (sellerToken) {
      history(`/sellerAllProducts/${sellerToken}`);
    } else if (error) {
      createErrorToast(error);
    }
  }, [sellerToken, loading, error, history]);

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sellerLogin(data.email, data.password));
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        pauseOnFocusLoss
        draggable
        theme="colored"
      />

      <h3 className="mx-5 my-2">Seller Account Login</h3>
      <hr />
      <div
        className="d-flex justify-content-center"
        style={{ height: "100vh" }}
      >
        <Form className="my-5" onSubmit={handleSubmit}>
          <Container>
            <Form.Group>
              <TextField
                size="small"
                label="Email"
                variant="outlined"
                name="email"
                required
                type="email"
                value={data.email}
                onChange={handleOnChange}
              />

              <br />
              <br />
              <TextField
                size="small"
                name="password"
                label="Password"
                variant="outlined"
                required
                value={data.password}
                onChange={handleOnChange}
                type="password"
              />
            </Form.Group>
          </Container>

          <Form.Group className="d-flex justify-content-center">
            <ThemeProvider theme={theme1}>
              <Button
                variant="contained"
                color="success"
                size="small"
                className="my-3"
                type="submit"
              >
                Login
              </Button>
            </ThemeProvider>
          </Form.Group>
          {loading && <Loading />}
          <div className="text-center mt-3">
            <Form.Label>Create new seller account?</Form.Label>
            <Link to={"/sellerRegistration"}>Start here</Link>
          </div>
        </Form>
      </div>
    </>
  );
};

export default SellerLogin;
