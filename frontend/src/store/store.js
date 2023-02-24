import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
	productListReducer,
	productDetailsReducer,
} from "./reducers/productReducers";

import { cartReducer } from "./reducers/cartReducer";

// combine reducers from state
const reducer = combineReducers({
	productDetails: productDetailsReducer,
	productList: productListReducer,
	cart: cartReducer,
});

// get the data from local storage
const getCartItemsFromLocalStorage = localStorage.getItem("cartItems")
	? JSON.parse(localStorage.getItem("cartItems"))
	: [];

// set the initial states
const initialState = {
	cart: { cartItems: getCartItemsFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
