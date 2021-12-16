import { applyMiddleware, createStore } from "redux";
import allReducers from "./Reducers";

const initialState = {};

const store = createStore(allReducers, initialState);

export default store;
