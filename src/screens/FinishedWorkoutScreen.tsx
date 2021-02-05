import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../utils/colors';
import { AppStackParamList } from '../navigation/appstack';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { ExercisesFlatlist } from '../components';

import { Workout } from '../redux/reducers/workoutsReducer';

type FinishedWorkoutScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'FinishedWorkoutScreen'
>;

type Props = {
  navigation: FinishedWorkoutScreenNavigationProp;
  route: RouteProp<{ params: { workout: Workout } }, 'params'>;
};

const FinishedWorkoutScreen: FC<Props> = (props) => {
  const { route } = props;

  return (
    <View style={styles.container}>
      <ExercisesFlatlist
        exercises={route.params.workout.exercises}
        forFinishedWorkout={true}
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
    paddingVertical: 20,
  },
});

export default FinishedWorkoutScreen;
