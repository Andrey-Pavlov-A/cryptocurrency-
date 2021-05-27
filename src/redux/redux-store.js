import { applyMiddleware, combineReducers, createStore } from "redux"
import thunkMiddleware from 'redux-thunk'
import coinReducer from "./coin-reducer";
import exchangeReducer from "./exchange-reducer";
import metadataReducer from "./metadata-reducer";

let reducers = combineReducers({
    coinsPage: coinReducer,
    metaDataPage: metadataReducer,
    exchangePage: exchangeReducer
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;
export default store;