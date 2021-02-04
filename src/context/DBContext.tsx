import React, { createContext, useState, useEffect, FC } from "react";
import { auth, db } from "../firebase/firebase";
import { Workout } from "../redux/reducers/workoutsReducer";
import { useDispatch } from "react-redux";
import * as Actions from "../redux/actions";
import { AddExerciseScreen } from "../screens";
//import firebase from "firebase";

type PropTypes = {
  children?: React.ReactNode;
};

const initialState = {
  isLoading: true,
  saveWorkoutRoutine: (workout: Workout, closure?: () => void) => {},
  getExercisesFromDB: () => {},
  exercises: [""],
  saveFinishedWorkout: (workout: Workout, closure?: () => void) => {},
};

export const DBContext = createContext(initialState);

const DBContextProvider: FC = (props: PropTypes) => {
  const { children } = props;

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState<string[]>([]);

  useEffect(() => {
    if (auth.currentUser) {
      const routinesSubscriber = db
        .collection("users")
        .doc(auth.currentUser!.uid)
        .collection("workoutRoutines")
        .onSnapshot((querySnapshot) => {
          const workoutRoutines: Workout[] = [];
          querySnapshot.forEach((documentSnapshot) => {
            workoutRoutines.push({
              title: documentSnapshot.data().title,
              exercises: documentSnapshot.data().exercises,
              key: documentSnapshot.id,
            });
          });
          dispatch(Actions.updateWorkouts(workoutRoutines));
          setIsLoading(false);
        });

      return () => routinesSubscriber();
    }

    const exercisesSubscriber = db
      .collection("Exercises")
      .onSnapshot((querySnapshot) => {
        const temp: string[] = [];
        querySnapshot.forEach((documentSnapshot) => {
          temp.push(documentSnapshot.data().name);
        });

        setExercises(temp);
      });

    return () => exercisesSubscriber();
  });

  const saveWorkoutRoutine = async (workout: Workout, closure?: () => void) => {
    await db
      .collection("users")
      .doc(auth.currentUser!.uid)
      .collection("workoutRoutines")
      .add(workout);

    if (closure) {
      closure();
    }
  };

  const getExercisesFromDB = async () => {
    let exercises: string[] = [];
    let snapshot = await db.collection("Exercises").get();

    if (snapshot) {
      snapshot.forEach((doc) => {
        exercises.push(doc.data().name);
      });
    }

    setExercises(exercises);
  };

  const saveFinishedWorkout = async (
    workout: Workout,
    closure?: () => void
  ) => {
    await db
      .collection("users")
      .doc(auth.currentUser!.uid)
      .collection("finishedWorkouts")
      .add(workout);

    if (closure) {
      closure();
    }
  };

  return (
    <DBContext.Provider
      value={{
        isLoading,
        saveWorkoutRoutine,
        getExercisesFromDB,
        exercises,
        saveFinishedWorkout,
      }}
    >
      {children}
    </DBContext.Provider>
  );
};

export default DBContextProvider;
