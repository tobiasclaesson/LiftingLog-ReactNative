import React, { createContext, useState, useEffect, FC } from "react";
import { auth, db } from "../firebase/firebase";
import { Workout } from "../reducers/workoutsReducer";
//import firebase from "firebase";

type PropTypes = {
  children?: React.ReactNode;
};

const initialState = {
  isLoading: true,
  saveWorkoutRoutine: (workout: Workout) => {},
};

export const DBContext = createContext(initialState);

const DBContextProvider: FC = (props: PropTypes) => {
  const { children } = props;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {});

  const saveWorkoutRoutine = (workout: Workout) => {
    db.collection("users")
      .doc(auth.currentUser!.uid)
      .collection("workoutRoutines")
      .add(workout);
  };

  return (
    <DBContext.Provider value={{ isLoading, saveWorkoutRoutine }}>
      {children}
    </DBContext.Provider>
  );
};

export default DBContextProvider;
