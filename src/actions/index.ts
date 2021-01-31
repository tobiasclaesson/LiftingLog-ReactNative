import { Workout, WorkoutsState } from "../reducers/workoutsReducer";

export const UPDATE_WORKOUTS: string = "UPDATE_WORKOUTS";

export type Action = {
  type: typeof UPDATE_WORKOUTS;
  payload: { workouts: Workout[] };
};

export const updateWorkouts = (workouts: Workout[]): Action => {
  return {
    type: UPDATE_WORKOUTS,
    payload: {
      workouts: workouts,
    },
  };
};
