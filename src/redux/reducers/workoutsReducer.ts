import * as ActionTypes from '../actions';

export interface WorkoutsState {
  workouts: Array<Workout>;
  finishedWorkouts: Array<Workout>;
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
  finishedWorkouts: [],
};

export const workoutsReducer = (
  state = initialState,
  action: ActionTypes.WorkoutsActionTypes
): WorkoutsState => {
  switch (action.type) {
    case ActionTypes.UPDATE_WORKOUTS: {
      return { ...state, workouts: action.payload.workouts };
    }
    case ActionTypes.UPDATE_FINISHED_WORKOUTS: {
      return {
        ...state,
        finishedWorkouts: action.payload.finishedWorkouts,
      };
    }
    default:
      return state;
  }
};
