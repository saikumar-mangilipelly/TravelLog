import { applyMiddleware, combineReducers, createStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import loginReducer from "./reducers";
const rootReducer = combineReducers({
    loginReducer,
})
export const Store=createStore(rootReducer,applyMiddleware(thunk))
