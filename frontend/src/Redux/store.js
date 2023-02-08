import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { cartReducer } from './Reducers/CartReducer';
import { productDetailsReducer, productListReducer } from './Reducers/ProductReducer';

const reducer = combineReducers({
  productList:productListReducer,
  productDetails:productDetailsReducer,
  cart:cartReducer
});

const cartItemsFromLocalStorage = localStorage.getItem('cartItems')?
JSON.parse(localStorage.getItem('cartItems')):[]

const initialState = {
    cart:{
      cartItems: cartItemsFromLocalStorage
    }
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store