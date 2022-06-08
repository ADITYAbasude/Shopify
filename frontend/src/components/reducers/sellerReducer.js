export const sellerRegister = (state = {}, action) => {
    switch (action.type) {
        case 'SELLER_REGISTRATION_REQUEST':
            return {
                loading: true
            }
        case 'SELLER_REGISTRATION_SUCCESSFULLY':
            return {
                loading: false
            }
        case 'SELLER_REGISTRATION_FAIL':
            return {
                loading: false,
                error: action.payload
            }

        default: return state
    }
}

export const sellerLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SELLER_LOGIN_REQUEST':
            return {
                loading: true
            }
        case 'SELLER_LOGIN_SUCCESSFUL':
            return {
                loading: false,
                token: action.payload
            }
        case 'SELLER_LOGIN_FAIL':
            return {
                loading: false,
                error: action.payload
            }

        default: return state
    }
}


export const addProduct = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_PRODUCT_REQUEST':
            return {
                loading: true
            }
        case 'ADD_PRODUCT_SUCCESSFULLY':
            return {
                loading: false,
                res: action.payload
            }
        case 'ADD_PRODUCT_FAIL':
            return {
                loading: false,
                error: action.payload
            }

        default: return state
    }
}

export const getProducts = (state = { products: [] }, action) => {
    switch (action.type) {
        case 'GET_SELLER_PRODUCTS_REQUEST':
            return {
                loading: true
            }
        case 'GET_SELLER_PRODUCTS_SUCCESSFUL':
            return {
                loading: false,
                products: action.payload
            }
        case 'GET_SELLER_PRODUCTS_FAIL':
            return {
                loading: false,
                error: action.payload
            }

        default: return state
    }
}


export const getSellerInfoReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_SELLER_INFO_REQUEST':
            return {
                status: true
            }
        case 'GET_SELLER_INFO_SUCCESSFUL':
            return {
                status: false,
                sellerInfo: action.payload
            }
        case 'GET_SELLER_INFO_FAIL':
            return {
                status: false,
                bug: action.payload
            }

        default: return state
    }
}


export const getSellerOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_SELLER_ORDER_REQUEST':
            return {
                status: true
            }
        case 'GET_SELLER_ORDER_SUCCESSFUL':
            return {
                status: false,
                orders: action.payload
            }
        case 'GET_SELLER_ORDER_FAIL':
            return {
                status: false,
            }

        default: return state
    }
}
