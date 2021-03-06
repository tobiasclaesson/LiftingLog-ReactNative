import React, { FC, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import colors from '../utils/colors';
import { AppStackParamList } from '../navigation/appstack';
import { StackNavigationProp } from '@react-navigation/stack';
import { ExercisesFlatlist } from '../components';
import { DBContext } from '../context/DBContext';
import { RouteProp } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerState } from '../redux/reducers';
import * as Actions from '../redux/actions';

type ActiveWorkoutScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'ActiveWorkoutScreen'
>;

type Props = {
  navigation: ActiveWorkoutScreenNavigationProp;
  route: RouteProp<{ params: { workoutIndex: number } }, 'params'>;
};

const ActiveWorkoutScreen: FC<Props> = (props) => {
  const { navigation, route } = props;
  const workouts = useSelector((state: ReducerState) => state.workoutsReducer);
  const workout = workouts.workouts[route.params.workoutIndex];
  const { saveFinishedWorkout } = useContext(DBContext);

  const exercises_ = useSelector(
    (state: ReducerState) => state.exercisesReducer
  );
  const exercises = exercises_.exercises;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Actions.updateExercises(workout.exercises));
  }, []);

  const finishWorkout = () => {
    const date = new Date();
    saveFinishedWorkout(
      { ...workout, exercises: exercises, finishedDate: date },
      () => navigation.goBack()
    );
  };

  const button = (text: string, onPress: () => void) => {
    return (
      <TouchableOpacity style={styles.button} onPress={() => onPress()}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ExercisesFlatlist
        exercises={exercises}
        flatlistFooter={
          <View style={styles.buttonContainer}>
            {button('Finish Workout', () => finishWorkout())}
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    backgroundColor: colors.primary,
    paddingTop: 10,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 20,
    marginBottom: 30,
    width: '90%',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: colors.primaryDark,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '40%',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    color: colors.white,
    fontFamily: 'Verdana',
  },
});

export default ActiveWorkoutScreen;
