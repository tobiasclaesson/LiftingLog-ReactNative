import { createStore } from "redux";
import allReducers from "../src/redux/reducers";

export const store = createStore(allReducers);
