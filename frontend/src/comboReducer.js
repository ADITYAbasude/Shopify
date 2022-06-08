import { getUserOrderReducer, productOrderReducer } from "./components/reducers/orderReducer";

const { combineReducers } = require("redux");


const { logInReducer,
    signUpReducer,
    userInfoReduce } = require('./components/reducers/userReducer')


const { sellerRegister,
    addProduct,
    getProducts,
    sellerLoginReducer,
    getSellerInfoReducer, 
    getSellerOrderReducer} = require('./components/reducers/sellerReducer')

const {
    getProductReducer,
    getProductDetailReducer,
    giveReviewReducer,
    addCartReducer,
    getProductFromCartReducer,
    deleteProductFromCartReducer,
    getRandProductReducer
} = require('./components/reducers/buyerReducer')


const {
    createOrderReducer
} = require('./components/reducers/paymentReducer')

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
    getSellerOrder: getSellerOrderReducer
})

export default reducers;