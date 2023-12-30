const {
  addCartReducer,
  deleteProductFromCartReducer,
  getProductDetailReducer,
  getProductFromCartReducer,
  getProductReducer,
  getRandProductReducer,
  giveReviewReducer,
} = require("./reducers/buyerReducer");

const { combineReducers } = require("redux");
const {
  getUserOrderReducer,
  productOrderReducer,
} = require("./reducers/orderReducer");

const {
  logInReducer,
  signUpReducer,
  userInfoReduce,
} = require("./reducers/userReducer");

const {
  sellerRegister,
  addProduct,
  getProducts,
  sellerLoginReducer,
  getSellerInfoReducer,
  getSellerOrderReducer,
} = require("./reducers/sellerReducer");

const { createOrderReducer } = require("./reducers/paymentReducer");

const reducers = combineReducers({
  userLogin: logInReducer,
  userSignup: signUpReducer,
  seller: sellerRegister,
  productAdd: addProduct,
  sellerProducts: getProducts,
  userInfo: userInfoReduce,
  getProducts: getProductReducer,
  sellerLogIn: sellerLoginReducer,
  productDetail: getProductDetailReducer,
  getSellerInfo: getSellerInfoReducer,
  reviewReducer: giveReviewReducer,
  addCart: addCartReducer,
  getProductFromCart: getProductFromCartReducer,
  deleteProductFromCart: deleteProductFromCartReducer,
  createOrder: createOrderReducer,
  productOrder: productOrderReducer,
  getUserOrder: getUserOrderReducer,
  getRandProduct: getRandProductReducer,
  getSellerOrder: getSellerOrderReducer,
});

export default reducers;
