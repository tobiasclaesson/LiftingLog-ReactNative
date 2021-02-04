import * as ActionTypes from "../actions";
import { ExercisesActionTypes } from "../actions";
import { Exercise } from "./workoutsReducer";

export interface ExercisesState {
  exercises: Exercise[];
}

const initialState: ExercisesState = {
  exercises: [],
};

export function exercisesReducer(
  state = initialState,
  action: ExercisesActionTypes
): ExercisesState {
  switch (action.type) {
    case ActionTypes.UPDATE_EXERCISES: {
      return action.payload;
    }
    case ActionTypes.ADD_SET: {
      const temp = state.exercises;
      temp[action.payload.exerciseIndex].sets.push({
        reps: 0,
        weight: 0,
      });
      return { ...state, exercises: temp };
    }
    case ActionTypes.REMOVE_SET: {
      const temp = state.exercises;
      temp[action.payload.exerciseIndex].sets.splice(
        action.payload.setIndex,
        1
      );
      return { ...state, exercises: temp };
    }
    case ActionTypes.REMOVE_EXERCISE: {
      const temp = state.exercises;
      temp.splice(action.payload.exerciseIndex, 1);
      return { ...state, exercises: temp };
    }
    default:
      return state;
  }
}
