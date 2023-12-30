import React, { useEffect, useState } from "react";
import { Form, Button, Row, Container } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import { Link, useNavigate } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../actions/userAction";
import "../../style/authStyle.css";
import Loader from "../../components/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SignUp = () => {
  const { loading, error, token } = useSelector((state) => state.userSignup);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(
      signUp(userData.name, userData.mobile, userData.email, userData.password)
    );
  };

  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const history = useNavigate();
  useEffect(() => {
    if (
      localStorage.getItem("jwtToken") !== null &&
      localStorage.getItem("jwtToken") !== "undefined"
    ) {
      toast.success("Successfully signup", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      history("/");
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
      <Container>
        <Row>
          <Form onSubmit={handleLogin} className="formBody container my-4">
            <h4 className="mt-2">SignUp</h4>
            <hr />

            <Form.Group>
              <Form.Control
                required
                type="name"
                placeholder="Your name"
                value={userData.name}
                onChange={handleOnChange}
                name="name"
              />
              <Form.Label className={"mt-3"}>Mobile number</Form.Label>
              <PhoneInput
                inputStyle={{
                  width: "100%",
                }}
                inputProps={{
                  name: "phone",
                  required: true,
                  autoFocus: true,
                }}
                country={"in"}
                value={userData.mobile}
                onChange={(phone) => {
                  setUserData({ ...userData, mobile: phone });
                }}
                name="mobile"
              />
            </Form.Group>

            <Form.Group className="mt-4" controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Your email"
                value={userData.email}
                onChange={handleOnChange}
                name="email"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="mt-3">Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Your password"
                value={userData.password}
                onChange={handleOnChange}
                name="password"
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
              <Form.Label>If you have already account? </Form.Label>
              <Link to={"/login"}> LogIn </Link>
            </div>

            {loading && <Loader style={{ position: "absolute" }} />}
          </Form>
        </Row>
      </Container>
    </>
  );
};
