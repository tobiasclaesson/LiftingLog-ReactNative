import { workoutsReducer } from "./workoutsReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  workoutsReducer,
});

export default allReducers;

export type ReducerState = ReturnType<typeof allReducers>;
