import axios from "axios"

export const orderAction = (orderId, title, amount, image, paymentId, sellerId ,productId , quantity) => async (dispatch) => {
    const config = {
        headers: {
            'auth-token': localStorage.getItem('jwtToken'),
            'content-type': 'application/json'
        }
    }
    const body = {
        title,
        amount,
        image,
        paymentId,
        sellerId,
        productId,
        quantity
    }
    dispatch({
        type: 'ORDER_REQUEST'
    })
    console.log(body)
    try {
        console.log(sellerId)
        axios.post(`http://localhost:5000/api/orders/orders/${orderId}`, body, config)
            .then((res) => {
                dispatch({
                    type: 'ORDER_SUCCESSFUL',
                    payload: res.data.message
                })
                
            })
            .catch((err) => {
                dispatch({
                    type: 'ORDER_FAIL',
                    payload: err.response
                })
                console.log(err)
            })
    } catch (err) {
        dispatch({
            type: 'ORDER_FAIL',
            payload: err
        })
    }

}


export const getUserOrdersAction = () => async (dispatch) => {
    const config = {
        headers: {
            'auth-token': localStorage.getItem('jwtToken'),
            'content-type': 'application/json'
        }
    }

    dispatch({
        type: 'GET_USER_ORDER_REQUEST'
    })

    try {

        axios.get(`http://localhost:5000/api/orders/getOrders`, config)
            .then((res) => {
                dispatch({
                    type: 'GET_USER_ORDER_SUCCESSFUL',
                    payload: res.data
                })
                
            })
            .catch((err) => {
                dispatch({
                    type: 'GET_USER_ORDER_FAIL',
                    payload: err.response
                })
                console.log(err)
            })
    } catch (err) {
        dispatch({
            type: 'GET_USER_ORDER_FAIL',
            payload: err
        })
    }
}