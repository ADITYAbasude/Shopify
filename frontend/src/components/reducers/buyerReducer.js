export const getProductReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_PRODUCT_REQUEST':
            return {
                loading: true
            }
        case 'GET_PRODUCT_SUCCESSFUL':
            return {
                loading: false,
                products: action.payload
            }
        case 'GET_PRODUCT_FAIL':
            return {
                loading: false,
                error: action.payload
            }

        default: return state
    }
}

export const getProductDetailReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_PRODUCT_DETAIL_REQUEST':
            return {
                loading: true
            }
        case 'GET_PRODUCT_DETAIL_SUCCESSFUL':
            return {
                loading: false,
                data: action.payload
            }
        case 'GET_PRODUCT_DETAIL_FAIL':
            return {
                loading: false,
                error: action.payload
            }

        default: return state
    }
}

export const giveReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case 'REVIEW_REQUEST':
            return {
                loading: true
            }
        case 'REVIEW_SUCCESSFULLY':
            return {
                loading: false,
                info: action.payload
            }
        case 'REVIEW_FAIL':
            return {
                loading: false,
                error: action.payload
            }

        default: return state
    }
}

export const addCartReducer = (state = {}, action) => {
    switch (action.type) {
        case 'USER_REQUEST_TO_ADD_THE_CART':
            return {
                loading: true
            }
        case 'USER_REQUEST_TO_ADD_THE_CART_SUCCESSFUL':
            return {
                loading: false,
                info: action.payload
            }
        case 'USER_REQUEST_TO_ADD_THE_CART_FAIL':
            return {
                loading: false,
                error: action.payload
            }

        default: return state
    }
}

export const getProductFromCartReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_CARD_LIST_REQUEST':
            return {
                loading: true
            }
        case 'GET_CARD_LIST_SUCCESSFUL':
            return {
                loading: false,
                cartData: action.payload
            }
        case 'GET_CARD_LIST_FAIL':
            return {
                loading: false,
                error: action.payload
            }

        default: return state
    }
}

export const deleteProductFromCartReducer = (state = {}, action) => {
    switch (action.type) {
        case 'DELETE_CART_REQUEST':
            return {
                loading: true
            }
        case 'DELETE_CART_SUCCESSFUL':
            return {
                status: false,
                data : action.payload
            }
        case 'DELETE_CART_FAIL':
            return {
                loading: false,
                error: action.payload
            }

        default: return state
    }
} 