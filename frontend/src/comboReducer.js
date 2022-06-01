const { combineReducers } = require("redux");
const { logInReducer,
    signUpReducer,
    userInfoReduce } = require('./components/reducers/userReducer')
const { sellerRegister,
    addProduct,
    getProducts,
    sellerLoginReducer,
    getSellerInfoReducer } = require('./components/reducers/sellerReducer')

const {
    getProductReducer,
    getProductDetailReducer,
    giveReviewReducer,
    addCartReducer,
    getProductFromCartReducer,
    deleteProductFromCartReducer
} = require('./components/reducers/buyerReducer')

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
    reviewReducer: giveReviewReducer ,
    addCart: addCartReducer,
    getProductFromCart: getProductFromCartReducer,
    deleteProductFromCart: deleteProductFromCartReducer
})

export default reducers;