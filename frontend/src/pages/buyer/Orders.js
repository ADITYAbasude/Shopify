import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrdersAction } from "../../actions/orderAction";
import Loader from "../../components/Loader";
import { Container, Card } from "@mui/material";
import { Col, Image, Row } from "react-bootstrap";

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, status } = useSelector((state) => state.getUserOrder);

  useEffect(() => {
    dispatch(getUserOrdersAction());
  }, [dispatch]);

  return (
    <>
      {status ? (
        <Loader />
      ) : (
        // creating an order cart to see orders in an elegant way
        orders?.map((pro) => {
          const base65String = btoa(
            String.fromCharCode(...new Uint8Array(pro.image.data.data))
          );
          return (
            <Card className="card" key={pro._id}>
              <Container>
                <Row>
                  <Col>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Image
                        src={`data:image/png;base64,${base65String}`}
                        fluid="true"
                        alt="img"
                        style={{ maxWidth: "250px", marginTop: "40px" }}
                      />
                    </div>
                  </Col>

                  <Col>
                    <div className="mt-3 mx-2">
                      <h5>{pro.title}</h5>
                    </div>
                    <br />
                    <h5>₹ {pro.amount}</h5>
                  </Col>
                </Row>
              </Container>
            </Card>
          );
        })
      )}
    </>
  );
};

export default Orders;
