import React, { FC } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Exercise } from '../redux/reducers/workoutsReducer';
import ExercisesFlatlistItem from './ExercisesFlatlistItem';

interface Props {
  exercises: Exercise[];
  flatlistHeader?: React.ReactNode;
  flatlistFooter?: React.ReactNode;
  forActiveWorkout?: boolean;
  forFinishedWorkout?: boolean;
}

const ExercisesFlatlist: FC<Props> = (props) => {
  const {
    exercises,
    forActiveWorkout,
    forFinishedWorkout,
    flatlistFooter,
    flatlistHeader,
  } = props;

  return (
    <View style={styles.container}>
      <FlatList
        data={exercises}
        style={styles.list}
        renderItem={({ item, index }) => (
          <ExercisesFlatlistItem
            exercise={item}
            exerciseIndex={index}
            forActiveWorkout={forActiveWorkout || false}
            forFinishedWorkout={forFinishedWorkout || false}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={<>{flatlistHeader || <></>}</>}
        ListFooterComponent={<>{flatlistFooter || <></>}</>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%' },
  list: {
    alignSelf: 'center',
    width: '100%',
  },
});

export default ExercisesFlatlist;
