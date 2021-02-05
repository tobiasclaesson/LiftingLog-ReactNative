import React, { createContext, useState, useEffect, FC } from 'react';
import { auth, db } from '../firebase/firebase';
import { Workout } from '../redux/reducers/workoutsReducer';
import { useDispatch } from 'react-redux';
import * as Actions from '../redux/actions';

type PropTypes = {
  children?: React.ReactNode;
};

const initialState = {
  exercisesIsLoading: true,
  historyIsLoading: true,
  workoutIsLoading: true,
  saveWorkoutRoutine: (workout: Workout, closure?: () => void) => null,
  saveFinishedWorkout: (workout: Workout, closure?: () => void) => null,
  removeWorkoutRoutine: (id: string, closure?: () => void) => null,
  getExercisesFromDB: () => Promise.all(['']),
  getHistoryFromDB: () =>
    Promise.all([
      {
        title: '',
        exercises: [{ name: '', sets: [{ reps: 0, weight: 0 }] }],
        key: '',
      },
    ]),
  getWorkoutsFromDB: () =>
    Promise.all([
      {
        title: '',
        exercises: [{ name: '', sets: [{ reps: 0, weight: 0 }] }],
        key: '',
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

  useEffect(() => {
    if (auth.currentUser) {
      const routinesSubscriber = db
        .collection('users')
        .doc(auth.currentUser.uid)
        .collection('workoutRoutines')
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
  });

  useEffect(() => {
    if (auth.currentUser) {
      const historySubscriber = db
        .collection('users')
        .doc(auth.currentUser.uid)
        .collection('finishedWorkouts')
        .onSnapshot((querySnapshot) => {
          const workouts: Workout[] = [];

          querySnapshot.forEach((documentSnapshot) => {
            workouts.push({
              title: documentSnapshot.data().title,
              exercises: documentSnapshot.data().exercises,
              key: documentSnapshot.data().key,
              finishedDate: documentSnapshot.data().finishedDate.toDate(),
            });
          });

          dispatch(Actions.updateFinishedWorkouts(workouts));
        });

      return () => historySubscriber();
    }
  });

  const saveWorkoutRoutine = async (workout: Workout, closure?: () => void) => {
    if (auth.currentUser) {
      await db
        .collection('users')
        .doc(auth.currentUser.uid)
        .collection('workoutRoutines')
        .add(workout);

      if (closure) {
        closure();
      }
    }
  };

  const removeWorkoutRoutine = async (id: string, closure?: () => void) => {
    if (auth.currentUser) {
      await db
        .collection('users')
        .doc(auth.currentUser.uid)
        .collection('workoutRoutines')
        .doc(id)
        .delete();

      if (closure) {
        closure();
      }
    }
  };

  const getExercisesFromDB = async (): Promise<string[]> => {
    const snapshot = await db.collection('Exercises').get();

    const exercises: string[] = [];

    if (snapshot) {
      snapshot.forEach((doc) => {
        exercises.push(doc.data().name);
      });
    }
    setExercisesIsLoading(false);
    return Promise.all(exercises);
  };

  const getWorkoutsFromDB = async (): Promise<Workout[]> => {
    const workouts: Workout[] = [];
    if (auth.currentUser) {
      const snapshot = await db
        .collection('users')
        .doc(auth.currentUser.uid)
        .collection('workoutRoutines')
        .get();

      if (snapshot) {
        snapshot.forEach((doc) => {
          workouts.push({
            title: doc.data().title,
            exercises: doc.data().exercises,
            key: doc.id,
          });
        });
      }
    }
    setWorkoutIsLoading(false);
    return Promise.all(workouts);
  };

  const getHistoryFromDB = async (): Promise<Workout[]> => {
    const finishedWorkouts: Workout[] = [];
    if (auth.currentUser) {
      const snapshot = await db
        .collection('users')
        .doc(auth.currentUser.uid)
        .collection('finishedWorkouts')
        .get();

      if (snapshot) {
        snapshot.forEach((doc) => {
          finishedWorkouts.push({
            title: doc.data().title,
            exercises: doc.data().exercises,
            key: doc.data().key,
            finishedDate: doc.data().finishedDate.toDate(),
          });
        });
      }
      setHistoryIsLoading(false);
    }
    return Promise.all(finishedWorkouts);
  };

  const saveFinishedWorkout = async (
    workout: Workout,
    closure?: () => void
  ) => {
    console.log('save');
    console.log(workout);
    if (auth.currentUser) {
      await db
        .collection('users')
        .doc(auth.currentUser.uid)
        .collection('finishedWorkouts')
        .add(workout);

      if (closure) {
        closure();
      }
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
      }}
    >
      {children}
    </DBContext.Provider>
  );
};

export default DBContextProvider;
