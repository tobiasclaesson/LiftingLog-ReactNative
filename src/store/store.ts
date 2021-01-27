import { createStore } from 'redux';
import { workoutReducer } from '../reducers/workoutReducer';

export const store = createStore(workoutReducer);