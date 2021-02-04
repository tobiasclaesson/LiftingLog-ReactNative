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
  exercisesIsLoading: true,
  historyIsLoading: true,
  workoutIsLoading: true,
  finishedWorkoutss: [
    {
      title: "",
      exercises: [{ name: "", sets: [{ reps: 0, weight: 0 }] }],
      key: "",
    },
  ],
  saveWorkoutRoutine: (workout: Workout, closure?: () => void) => {},
  saveFinishedWorkout: (workout: Workout, closure?: () => void) => {},
  removeWorkoutRoutine: (id: string, closure?: () => void) => {},
  getExercisesFromDB: () => Promise.all([""]),
  getHistoryFromDB: () =>
    Promise.all([
      {
        title: "",
        exercises: [{ name: "", sets: [{ reps: 0, weight: 0 }] }],
        key: "",
      },
    ]),
  getWorkoutsFromDB: () =>
    Promise.all([
      {
        title: "",
        exercises: [{ name: "", sets: [{ reps: 0, weight: 0 }] }],
        key: "",
      },
    ]),
};

export const DBContext = createContext(initialState);

const DBContextProvider: FC = (props: PropTypes) => {
  const { children } = props;

  const dispatch = useDispatch();

  const [exercisesIsLoading, setExercisesIsLoading] = useState(true);
  const [historyIsLoading, setHistoryIsLoading] = useState(true);
  const [workoutIsLoading, setWorkoutIsLoading] = useState(true);

  const [finishedWorkoutss, setfinishedWorkoutss] = useState<Workout[]>([]);

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
        });

      return () => routinesSubscriber();
    }

    if (auth.currentUser) {
      const historySubscriber = db
        .collection("users")
        .doc(auth.currentUser!.uid)
        .collection("finishedWorkouts")
        .onSnapshot((querySnapshot) => {
          const workouts: Workout[] = [];
          querySnapshot.forEach((documentSnapshot) => {
            workouts.push({
              title: documentSnapshot.data().title,
              exercises: documentSnapshot.data().exercises,
              key: documentSnapshot.id,
              finishedDate: documentSnapshot.data().finishedDate,
            });
          });
          setfinishedWorkoutss(workouts);
        });

      return () => historySubscriber();
    }
    // const exercisesSubscriber = db
    //   .collection("Exercises")
    //   .onSnapshot((querySnapshot) => {
    //     const temp: string[] = [];
    //     querySnapshot.forEach((documentSnapshot) => {
    //       temp.push(documentSnapshot.data().name);
    //     });

    //     setExercises(temp);
    //   });

    // return () => exercisesSubscriber();
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

  const removeWorkoutRoutine = async (id: string, closure?: () => void) => {
    await db
      .collection("users")
      .doc(auth.currentUser!.uid)
      .collection("workoutRoutines")
      .doc(id)
      .delete();

    if (closure) {
      closure();
    }
  };

  // const getExercisesFromDB = async () => {
  //   let exercises: string[] = [];
  //   let snapshot = await db.collection("Exercises").get();

  //   if (snapshot) {
  //     snapshot.forEach((doc) => {
  //       exercises.push(doc.data().name);
  //     });
  //   }

  //   setExercises(exercises);
  // };

  const getExercisesFromDB = async (): Promise<string[]> => {
    let snapshot = await db.collection("Exercises").get();

    let exercises: string[] = [];

    if (snapshot) {
      snapshot.forEach((doc) => {
        exercises.push(doc.data().name);
      });
    }
    setExercisesIsLoading(false);
    return Promise.all(exercises);
  };

  const getWorkoutsFromDB = async (): Promise<Workout[]> => {
    let snapshot = await db
      .collection("users")
      .doc(auth.currentUser!.uid)
      .collection("workoutRoutines")
      .get();

    let workouts: Workout[] = [];

    if (snapshot) {
      snapshot.forEach((doc) => {
        workouts.push({
          title: doc.data().title,
          exercises: doc.data().exercises,
          key: doc.id,
        });
      });
    }
    setWorkoutIsLoading(false);
    return Promise.all(workouts);
  };

  const getHistoryFromDB = async (): Promise<Workout[]> => {
    let snapshot = await db
      .collection("users")
      .doc(auth.currentUser!.uid)
      .collection("finishedWorkouts")
      .get();

    let finishedWorkouts: Workout[] = [];

    if (snapshot) {
      snapshot.forEach((doc) => {
        finishedWorkouts.push({
          title: doc.data().title,
          exercises: doc.data().exercises,
          key: doc.data().key,
        });
      });
    }
    setHistoryIsLoading(false);
    return Promise.all(finishedWorkouts);
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
        exercisesIsLoading,
        historyIsLoading,
        workoutIsLoading,
        saveWorkoutRoutine,
        saveFinishedWorkout,
        removeWorkoutRoutine,
        getExercisesFromDB,
        getHistoryFromDB,
        getWorkoutsFromDB,
        finishedWorkoutss,
      }}
    >
      {children}
    </DBContext.Provider>
  );
};

export default DBContextProvider;
