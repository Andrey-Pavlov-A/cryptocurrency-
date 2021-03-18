import { applyMiddleware, combineReducers, createStore } from "redux"
import thunkMiddleware from 'redux-thunk'
import coinReducer from "./coin-reducer";

let reducers = combineReducers({
    coinsPage: coinReducer
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;
export default store;