import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Form, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDetail,
  addToTheCartAction,
} from "../../actions/buyerAction";
import {
  Avatar,
  Button,
  createTheme,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { AddShoppingCartSharp, LocalMallOutlined } from "@mui/icons-material";
import { getSellerInfoAction } from "../../actions/sellerAction";
import Rating from "../../components/Rate";
import Loading from "../../components/Loader";
import user from "../../data/img/user.png";
import { green } from "@mui/material/colors";
import Star from "@mui/icons-material/Star";
import { ToastContainer, toast } from "react-toastify";
import logo from "../../data/img/logo.png";
import { createOrderAction } from "../../actions/paymentAction";
import { orderAction } from "../../actions/orderAction";

const DetailedProduct = () => {
  const productId = useParams();
  const dispatch = useDispatch();
  const { loading, data } = useSelector((state) => state.productDetail);
  const { sellerInfo } = useSelector((state) => state.getSellerInfo);
  const { orderResult } = useSelector((state) => state.createOrder);
  const { info } = useSelector((state) => state.addCart);
  const { orderSave } = useSelector((state) => state.productOrder);
  const data2 = JSON.parse(localStorage.getItem("admin"));

  const handleToastSuccess = (text) => {
    toast.success(text, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      closeButton: false,
    });
  };

  const handleAddCart = (title, amount, stock, image) => (e) => {
    e.preventDefault();
    dispatch(addToTheCartAction(productId, title, amount, stock, image));
    if (info) {
      handleToastSuccess(info);
    }
  };

  const theme1 = createTheme({
    typography: {
      button: {
        textTransform: "none",
      },
    },
    palette: {
      success: {
        main: green[500],
      },
    },
  });

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      document.body.appendChild(script);
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
    });
  }

  const handlePayment =
    (
      name,
      email,
      contact,
      amount,
      currency = "INR",
      image,
      title,
      sellerId,
      quantity = 1
    ) =>
    async (e) => {
      e.preventDefault();
      // creating order by using Razorpay order API
      dispatch(createOrderAction(amount, currency));

      await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      const options = {
        key: process.env.keyId,
        amount: amount,
        currency: currency,
        name: "Shopify",
        image: logo,
        order_id: orderResult?.id,
        handler: function (response) {
          dispatch(
            orderAction(
              orderResult?.id,
              title,
              amount,
              image,
              response.razorpay_payment_id,
              sellerId,
              productId.id,
              quantity
            )
          );
          if (!orderSave) {
            handleToastSuccess("Thanks for ordering");
          }
        },
        prefill: {
          name,
          email,
          contact,
        },
        theme: {
          color: "#22a32a",
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    };

  const width = window.innerWidth;
  useEffect(() => {
    dispatch(getSellerInfoAction(productId.id));
    dispatch(getProductDetail(productId.id));
  }, []);
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
      {!loading ? (
        <Container>
          <ThemeProvider theme={theme1}>
            {data?.map((pro) => {
              const base65String = btoa(
                String.fromCharCode(...new Uint8Array(pro.image.data.data))
              );
              return (
                <Form.Group key={pro._id}>
                  <Form.Group className="row">
                    <Form.Group
                      className="col"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Image
                        src={`data:image/png;base64,${base65String}`}
                        alt="img"
                        style={{
                          marginTop: "50px",
                          width: `${width <= 400 ? "180px" : ""}`,
                        }}
                      />
                    </Form.Group>
                    <Form.Group className="col" style={{ marginLeft: "15px" }}>
                      <h3
                        className="my-2 mt-5"
                        style={{ fontSize: `${width <= 600 ? "25px" : ""}` }}
                      >
                        {pro.title}
                      </h3>
                      <Typography
                        color={pro.stock > 0 ? "success.main" : "error.main"}
                      >
                        {pro.stock > 0 ? "In stock" : "Out of stock"}
                      </Typography>
                      <h4 style={{ fontSize: `${width <= 600 ? "20px" : ""}` }}>
                        ₹ {pro.amount}
                      </h4>
                      <ThemeProvider theme={theme1}>
                        <Button
                          variant="contained"
                          color="success"
                          className="my-3 mx-2"
                          type="submit"
                          startIcon={<LocalMallOutlined />}
                          size={width <= 600 ? "small" : "medium"}
                          onClick={handlePayment(
                            data2.name,
                            data2.email,
                            data2.mobile,
                            pro.amount * 100,
                            "INR",
                            pro.image,
                            pro.title,
                            pro.sellerId
                          )}
                          sx={{
                            display: `${pro.stock > 0 ? "" : "none"}`,
                          }}
                        >
                          Buy
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          className="my-3"
                          type="submit"
                          startIcon={<AddShoppingCartSharp />}
                          onClick={handleAddCart(
                            pro.title,
                            pro.amount,
                            pro.stock,
                            pro.image
                          )}
                          size={width <= 600 ? "small" : "medium"}
                        >
                          Add cart
                        </Button>
                      </ThemeProvider>
                    </Form.Group>
                  </Form.Group>

                  <h4 style={{ marginTop: "15px" }}>Product detail</h4>
                  <Form.Group className="mx-4">
                    <h6 style={{ maxWidth: "600px" }}>{pro.productsDetails}</h6>
                  </Form.Group>

                  <br />

                  <Form.Group className="row">
                    <h4>Seller details</h4>
                    <Form.Group className="mx-4 col">
                      <h6>
                        Shop name: <b>{sellerInfo?.shopName}</b>
                      </h6>
                      <h6>
                        Shop address: <b>{sellerInfo?.address}</b>
                      </h6>
                      <h6>
                        Shop contact number: <b>{sellerInfo?.contactNumber}</b>
                      </h6>
                    </Form.Group>

                    <Form.Group>
                      <br />
                      <h5>Product review</h5>
                      {data?.map((pro, index) => {
                        return (
                          <Rating
                            key={index}
                            numReviews={pro.numReviews}
                            rating={pro.rating}
                            productId={pro._id}
                          />
                        );
                      })}
                    </Form.Group>
                  </Form.Group>
                </Form.Group>
              );
            })}

            {/* showing the reviews of the product  */}
            <List sx={{ width: "100%" }}>
              {data?.map((pro) => {
                return pro.reviews.map((review) => {
                  return (
                    <ListItem key={review._id} alignItems="flex-start">
                      {pro.numReviews > 0 ? (
                        <ListItemAvatar>
                          <Avatar src={user} />
                        </ListItemAvatar>
                      ) : (
                        ""
                      )}
                      <ListItemText
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color={"text.primary"}
                              fontSize="18px"
                            >
                              {review.name}
                            </Typography>
                            <br />
                            <Typography
                              sx={{ display: "inline" }}
                              variant="body2"
                              color={"text.primary"}
                              fontSize="15px"
                            >
                              {" " + review.comment + " "}
                            </Typography>
                            <br />
                            {pro.numReviews !== 0 ? (
                              <Typography
                                sx={{
                                  display: "inline",
                                  backgroundColor: "success.main",
                                }}
                                variant="palette"
                                color={"text.primary"}
                                fontSize="15px"
                                borderRadius={"4px"}
                                padding={"4px"}
                                display={"flex"}
                                justifyContent={"center"}
                              >
                                {review.rating}
                                <Star fontSize="small" />
                              </Typography>
                            ) : (
                              ""
                            )}
                          </React.Fragment>
                        }
                      />
                      <br />
                    </ListItem>
                  );
                });
              })}
            </List>
          </ThemeProvider>
        </Container>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default DetailedProduct;
