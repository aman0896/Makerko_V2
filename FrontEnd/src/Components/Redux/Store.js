import { applyMiddleware, createStore } from "redux";
import allReducers from "./Reducers";
import thunk from "redux-thunk";

const initialState = {};

const store = createStore(allReducers, initialState);

export default store;
