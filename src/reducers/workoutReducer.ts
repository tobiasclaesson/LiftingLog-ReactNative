import * as ActionTypes from "../actions";

export interface WorkoutState {
  title: string;
}

const initialState = {
  title: "Initial Title",
};

type Action = {
  type: string;
  payload: {
    title: string;
  };
};

export const workoutReducer = (
  state: WorkoutState = initialState,
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.SET_TITLE: {
      return { ...state, title: action.payload.title };
    }
    default:
      return state;
  }
};
