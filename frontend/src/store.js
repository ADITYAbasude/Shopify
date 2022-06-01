import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from './comboReducer'
const { createStore, applyMiddleware } = require("redux");



const store = createStore(
    reducers,
    {},
    composeWithDevTools(applyMiddleware(thunk))
)
export default store;