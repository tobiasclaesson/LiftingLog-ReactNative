import { Reducer } from "redux";
import * as ActionTypes from "../actions";

export interface WorkoutsState {
  workouts: Array<Workout>;
}

export interface Workout {
  title: string;
  exercises: Exercise[];
  key: string;
  finishedDate?: Date;
}

export interface Exercise {
  name: string;
  sets: Set[];
}

export interface Set {
  reps: number;
  weight: number;
}

const initialState: WorkoutsState = {
  workouts: [],
};

export const workoutsReducer = (
  state = initialState,
  action: ActionTypes.UpdateWorkoutAction
): WorkoutsState => {
  switch (action.type) {
    case ActionTypes.UPDATE_WORKOUTS: {
      return action.payload;
    }
    default:
      return state;
  }
};
