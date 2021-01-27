export const SET_TITLE: string = "SET_TITLE";

export type Action = { type: string; payload: {} };

const updateWorkoutTitle = (title: string): Action => {
  return {
    type: SET_TITLE,
    payload: {
      title: title,
    },
  };
};
