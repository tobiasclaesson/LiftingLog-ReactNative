import { workoutsReducer } from "./workoutsReducer";
import { exercisesReducer } from "./exercisesReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  workoutsReducer,
  exercisesReducer,
});

export default allReducers;

export type ReducerState = ReturnType<typeof allReducers>;
