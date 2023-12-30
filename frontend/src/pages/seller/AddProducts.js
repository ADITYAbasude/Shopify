import React, { useEffect, useState } from "react";
import { Button, Container, FloatingLabel, Form, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../actions/sellerAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ipad from "../../data/productsImg/ipad.jpg";

const AddProducts = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { loading, error, res } = useSelector((state) => state.productAdd);
  const goBack = {
    color: "black",
    marginLeft: "15px",
  };
  const dispatch = useDispatch();
  const [data, setData] = useState({
    title: "",
    productsDetails: "",
    stock: "",
    amount: "",
    productType: "",
  });
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
  function createSuccessToast(suc) {
    toast.success(suc, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  useEffect(() => {
    setData({
      title: "",
      productsDetails: "",
      stock: "",
      amount: "",
    });
    if (error) {
      createErrorToast(error);
    } else if (res) {
      createSuccessToast("product successfully added");
    }
  }, [error, loading, res]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("productImage", selectedFile);
    formData.append("title", data.title);
    formData.append("productsDetails", data.productsDetails);
    formData.append("stock", data.stock);
    formData.append("productType", data.productType);
    formData.append("amount", data.amount);
    dispatch(addProduct(formData));
  };
  const handleData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
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

      <Link
        to={`/sellerAllProducts/${localStorage.getItem("sellerToken")}`}
        style={goBack}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          className="bi bi-chevron-left"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
          />
        </svg>
      </Link>

      <Container>
        <Form onSubmit={handleSubmit}>
          <h3>Product</h3>
          <hr />
          <Form.Group className="col">
            <Image
              src={
                selectedFile !== null ? URL.createObjectURL(selectedFile) : ipad
              }
              alt="product image"
              loading="lazy"
              fluid
            />
            <Form.Group>
              <Form.Label>Chose a product photo</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    setSelectedFile(e.target.files[0]);
                  } else {
                    setSelectedFile(null);
                  }
                }}
              />
              <hr />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="text"
                placeholder="product title"
                name="title"
                onChange={handleData}
                value={data.title}
                required
              />

              <br />

              <FloatingLabel
                controlId="floatingTextarea2"
                label="Product details"
              >
                <Form.Control
                  as="textarea"
                  placeholder="Briefly"
                  name="productsDetails"
                  onChange={handleData}
                  value={data.productsDetails}
                  required
                />

                <br />
              </FloatingLabel>

              <Form.Select
                aria-label="Type of product"
                onChange={handleData}
                name="productType"
                value={data.productType}
                required
              >
                <option value="Type of product">Type of product</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Appliances">Appliances</option>
              </Form.Select>
              <br />
              <Form.Control
                type="number"
                placeholder="Total stock"
                name="stock"
                onChange={handleData}
                value={data.stock}
                required
              />

              <br />
              <Form.Control
                type="number"
                placeholder="Amount"
                name="amount"
                onChange={handleData}
                value={data.amount}
                required
              />

              <br />
              <Button className="my-3" variant="primary" type="submit">
                Add
              </Button>
            </Form.Group>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
};

export default AddProducts;
