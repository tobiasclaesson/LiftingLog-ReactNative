import { Exercise, Workout } from '../reducers/workoutsReducer';

// workouts
export const UPDATE_WORKOUTS = 'UPDATE_WORKOUTS';
export const UPDATE_FINISHED_WORKOUTS = 'UPDATE_FINISHED_WORKOUTS';

type UpdateWorkoutAction = {
  type: typeof UPDATE_WORKOUTS;
  payload: { workouts: Workout[] };
};
type UpdateFinishedWorkoutAction = {
  type: typeof UPDATE_FINISHED_WORKOUTS;
  payload: { finishedWorkouts: Workout[] };
};

export type WorkoutsActionTypes =
  | UpdateWorkoutAction
  | UpdateFinishedWorkoutAction;

export const updateWorkouts = (workouts: Workout[]): WorkoutsActionTypes => {
  return {
    type: UPDATE_WORKOUTS,
    payload: {
      workouts: workouts,
    },
  };
};
export const updateFinishedWorkouts = (
  finishedWorkouts: Workout[]
): WorkoutsActionTypes => {
  return {
    type: UPDATE_FINISHED_WORKOUTS,
    payload: {
      finishedWorkouts: finishedWorkouts,
    },
  };
};

// Exercises
export const UPDATE_EXERCISES = 'UPDATE_EXERCISES';
export const REMOVE_EXERCISE = 'REMOVE_EXERCISE';
export const ADD_SET = 'ADD_SET';
export const REMOVE_SET = 'REMOVE_SET';

interface UpdateExercisesAction {
  type: typeof UPDATE_EXERCISES;
  payload: { exercises: Exercise[] };
}
interface RemoveExerciseAction {
  type: typeof REMOVE_EXERCISE;
  payload: { exerciseIndex: number };
}
interface AddSetAction {
  type: typeof ADD_SET;
  payload: { exerciseIndex: number };
}
interface RemoveSetIndexes {
  exerciseIndex: number;
  setIndex: number;
}
interface RemoveSetAction {
  type: typeof REMOVE_SET;
  payload: RemoveSetIndexes;
}

export type ExercisesActionTypes =
  | UpdateExercisesAction
  | RemoveExerciseAction
  | AddSetAction
  | RemoveSetAction;

export const updateExercises = (
  exercises: Exercise[]
): ExercisesActionTypes => {
  return {
    type: UPDATE_EXERCISES,
    payload: {
      exercises,
    },
  };
};
export const removeExercise = (exerciseIndex: number): ExercisesActionTypes => {
  return {
    type: REMOVE_EXERCISE,
    payload: { exerciseIndex: exerciseIndex },
  };
};
export const addSet = (exerciseIndex: number): ExercisesActionTypes => {
  return {
    type: ADD_SET,
    payload: { exerciseIndex },
  };
};
export const removeSet = (
  exerciseIndex: number,
  setIndex: number
): ExercisesActionTypes => {
  return {
    type: REMOVE_SET,
    payload: { exerciseIndex: exerciseIndex, setIndex: setIndex },
  };
};
