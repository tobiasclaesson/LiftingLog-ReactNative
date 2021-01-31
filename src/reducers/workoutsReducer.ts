import { Reducer } from "redux";
import * as ActionTypes from "../actions";
import allReducers from "./index";

export interface WorkoutsState {
  workouts: Array<Workout>;
}

export interface Workout {
  title: string;
}

const initialState: WorkoutsState = {
  workouts: [{ title: "initial state" }],
};
//const initialState: WorkoutsState = [];

type Action = {
  type: string;
  payload: WorkoutsState;
};

export const workoutsReducer: Reducer<WorkoutsState, Action> = (
  state = initialState,
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.UPDATE_WORKOUTS: {
      return action.payload;
    }
    default:
      return state;
  }
};
