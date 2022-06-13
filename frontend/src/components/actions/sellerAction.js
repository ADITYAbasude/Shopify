import { display } from '@mui/system'
import axios from 'axios'

export const sellRegistration = (shopName, contactNumber, email, password, address, pincode) =>
    async (dispatch) => {

        const config = {
            'Content-type': 'application/json'
        }
        const body = {
            shopName,
            contactNumber,
            email,
            password,
            address,
            pincode
        }

        dispatch({
            type: 'SELLER_REGISTRATION_REQUEST'
        })

        try {
            axios.post('http://localhost:5000/api/seller/registration', body, config)
                .then((res) => {
                    dispatch({
                        type: "SELLER_REGISTRATION_SUCCESSFULLY",
                        payload: res.data.sellerToken
                    })
                    localStorage.setItem('sellerToken', res.data.sellerToken)
                }).catch((err) => {
                    dispatch({
                        type: 'SELLER_REGISTRATION_FAIL',
                        payload: err.response.data.error
                    })
                    console.log(err)
                })
        } catch (err) {
            dispatch({
                type: 'SELLER_REGISTRATION_FAIL',
                payload: err
            })
        }
    }


export const sellerLogin = (email, password) =>
    async (dispatch) => {
        const config = {
            'Content-type': 'application/json'
        }
        const body = {
            email,
            password
        }
        dispatch({
            type: 'SELLER_LOGIN_REQUEST'
        })

        try {
            axios.post(`http://localhost:5000/api/seller/sellerLogin`, body, config)
                .then((res) => {
                    dispatch({
                        type: 'SELLER_LOGIN_SUCCESSFUL',
                        payload: res.data.sellerToken
                    })
                    localStorage.setItem('sellerToken', res.data.sellerToken)
                }).catch((err) => {
                    dispatch({
                        type: 'SELLER_LOGIN_FAIL',
                        payload: err.response.data.error
                    })
                })
        } catch (err) {
            dispatch({
                type: 'SELLER_LOGIN_FAIL',
                payload: err
            })
        }

    }

export const addProduct = (formData) =>
    async (dispatch) => {


        const config = {
            headers: {
                'Content-type': 'application/json',
                'seller-token': localStorage.getItem('sellerToken')
            }
        }

        const body = {
            formData
        }

        

        dispatch({
            type: 'ADD_PRODUCT_REQUEST'
        })

        try {
            axios.post('http://localhost:5000/api/product/addProduct', body, config)
                .then((res) => {
                    dispatch({
                        type: "ADD_PRODUCT_SUCCESSFULLY",
                        payload: res.data
                    })
                    
                })
                .catch((err) => {
                    dispatch({
                        type: "ADD_PRODUCT_FAIL",
                        payload: err.response.data
                    })
                    console.error(err)
                })
        } catch (err) {
            dispatch({
                type: "ADD_PRODUCT_FAIL",
                payload: err
            })
        }
    }


export const getAllProducts = () =>
    async (dispatch) => {

        const config = {
            headers: {
                'seller-token': localStorage.getItem('sellerToken'),
                'content-type': 'application/json'
            }
        }
        dispatch({
            type: 'GET_SELLER_PRODUCTS_REQUEST'
        })
        try {
            axios.get(`http://localhost:5000/api/product/getSellerProducts`, config)
                .then((res) => {
                    dispatch({
                        type: 'GET_SELLER_PRODUCTS_SUCCESSFUL',
                        payload: res.data.product
                    })
                })
                .catch((err) => {
                    dispatch({
                        type: 'GET_SELLER_PRODUCTS_FAIL',
                        payload: err
                    })
                })
        } catch (err) {
            dispatch({
                type: 'GET_SELLER_PRODUCTS_FAIL',
                payload: err
            })
        }
    }


export const getSellerInfoAction = (productId) => async (dispatch) => {
    const config = {
        headers: {
            'seller-token': localStorage.getItem('sellerToken'),
            'content-type': 'application/json'
        }
    }

    dispatch({
        type: 'GET_SELLER_INFO_REQUEST'
    })
    try {
        axios.post(`http://localhost:5000/api/seller/getSeller/${productId}`, config)
            .then((res) => {
                dispatch({
                    type: 'GET_SELLER_INFO_SUCCESSFUL',
                    payload: res.data.sellerData
                })
            }).catch((err) => {
                dispatch({
                    type: 'GET_SELLER_INFO_FAIL',
                    payload: err
                })
            })
    } catch (err) {
        dispatch({
            type: 'GET_SELLER_INFO_FAIL',
            payload: err
        })
    }
}


export const productReviewAction = (productId, rating, comment) => async (dispatch) => {
    dispatch({
        type: 'PRODUCT_REVIEW_REQUEST'
    })

    const config = {
        headers: {
            'content-type': 'application/json',
            'auth-seller': localStorage.getItem('jwtToken')
        }
    }
    const body = {
        user: localStorage.getItem('userData'),
        rating: rating,
        comment: comment
    }

    try {
        await axios.
            post(`api/product/${productId}/rating`, body, config)
            .then((res) => {
                dispatch({
                    type: 'PRODUCT_REVIEW_SUCCESSFULLY'
                })
            })
            .catch((err) => {
                dispatch({
                    type: 'PRODUCT_REVIEW_FAIL',
                    payload: err.message
                })
            })
    } catch (e) {
        dispatch({
            type: 'PRODUCT_REVIEW_FAIL',
            payload: e
        })
    }
}


export const getSellerOrdersAction = () =>
    async (dispatch) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'seller-token': localStorage.getItem('sellerToken')
            }
        }
        dispatch({
            type: 'GET_SELLER_ORDER_REQUEST'
        })
        try {
            axios.get('http://localhost:5000/api/orders/getSellerOrders', config)
                .then((res) => {
                    dispatch({
                        type: 'GET_SELLER_ORDER_SUCCESSFUL',
                        payload: res.data
                    })
                })
                .catch((err) => {
                    dispatch({
                        type: 'GET_SELLER_ORDER_FAIL',
                        payload: err
                    })
                    console.log(err)
                })
        } catch (error) {
            dispatch({
                type: 'GET_SELLER_ORDER_FAIL'
            })
            console.log(error)

        }
    }