import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logIn } from "../../actions/userAction";
import "../../style/authStyle.css";
import Loader from "../../components/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const LogIn = () => {
  const { loading, error, token } = useSelector((state) => state.userLogin);
  const history = useNavigate();
  useEffect(() => {
    if (
      localStorage.getItem("jwtToken") !== null &&
      localStorage.getItem("jwtToken") !== "undefined"
    ) {
      history("/");
      console.log(loading);
    } else if (error) {
      toast.error(error.error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [token, loading, error, history]);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(logIn(userData.email, userData.password));
  };

  const handleOnChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
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
      <div className="d-flex justify-content-center my-5">
        <Form onSubmit={handleLogin} className="formBody container">
          <h4 className="mt-2">LogIn</h4>
          <hr />
          <Form.Group className="mt-4" controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter your email"
              value={userData.email}
              name="email"
              onChange={handleOnChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="mt-3">Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Enter your password"
              name="password"
              value={userData.password}
              onChange={handleOnChange}
            />
          </Form.Group>

          <Button
            style={{ width: "100%", marginTop: "20px" }}
            variant="success"
            type="submit"
          >
            Continue
          </Button>

          <div className="text-center mt-3">
            <Form.Label>New customer?</Form.Label>
            <Link to={"/signup"}>Start here</Link>
          </div>
          {loading && <Loader style={{ position: "absolute" }} />}
        </Form>
      </div>
    </>
  );
};
