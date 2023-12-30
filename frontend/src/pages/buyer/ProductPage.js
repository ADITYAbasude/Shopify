import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCart from "../../components/ProductCart";
import { getBuyerProducts } from "../../actions/buyerAction";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loader";
const ProductPage = () => {
  const type = useParams();
  const { products, loading } = useSelector((state) => state.getProducts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBuyerProducts(type.type));
  }, [dispatch, type]);

  return (
    <>
      <div>
        {loading ? (
          <Loading />
        ) : (
          products?.map((pro) => {
            return <ProductCart key={pro._id} pro={pro} />;
          })
        )}
      </div>
    </>
  );
};

export default ProductPage;
