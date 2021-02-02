import { Reducer } from "redux";
import * as ActionTypes from "../actions";
import allReducers from "./index";

export interface WorkoutsState {
  workouts: Array<Workout>;
}

export interface Workout {
  title: string;
  exercises: Exercise[];
  key: string;
}

export interface Exercise {
  name: string;
  set: number;
  reps: number[];
  weight: number[];
}

const initialState: WorkoutsState = {
  workouts: [],
};

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
