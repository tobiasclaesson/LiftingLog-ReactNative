import React, { FC } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { Exercise } from '../redux/reducers/workoutsReducer';
import colors from '../utils/colors';
import SetItem from './SetItem';
import * as Actions from '../redux/actions';

interface Props {
  exercise: Exercise;
  exerciseIndex: number;
  forActiveWorkout?: boolean;
  forFinishedWorkout?: boolean;
}

const ExercisesFlatlistItem: FC<Props> = (props) => {
  const {
    exercise,
    exerciseIndex,
    forActiveWorkout,
    forFinishedWorkout,
  } = props;
  const dispatch = useDispatch();

  const addSet = () => {
    dispatch(Actions.addSet(exerciseIndex));
  };

  const removeExercise = () => {
    dispatch(Actions.removeExercise(exerciseIndex));
  };

  const conditionallyRenderRemoveExerciseButton = () => {
    if (forActiveWorkout || forFinishedWorkout) {
      return <></>;
    } else {
      return (
        <TouchableOpacity
          style={styles.removeExerciseButton}
          onPress={() => removeExercise()}
        >
          <Text style={[styles.text, styles.removeExerciseButtonText]}>X</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{exercise.name}</Text>
        {conditionallyRenderRemoveExerciseButton()}
      </View>
      <View style={styles.setsContainer}>
        <View
          style={
            exercise.sets.length > 0 ? styles.setsHeader : styles.dontDisplay
          }
        >
          <View style={styles.sectionOne}>
            <Text style={styles.setLabel}>Set</Text>
          </View>
          <View style={styles.sectionTwo}>
            <Text style={styles.setLabel}>Reps</Text>
          </View>
          <View style={styles.sectionThree}>
            <Text style={styles.setLabel}>Weight</Text>
          </View>
          <View style={styles.sectionFour}></View>
        </View>
        <FlatList
          data={exercise.sets}
          renderItem={({ item, index }) => (
            <SetItem
              key={index}
              set={item}
              setIndex={index}
              exerciseIndex={exerciseIndex}
              forFinishedWorkout={forFinishedWorkout || false}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        {!forFinishedWorkout ? (
          <TouchableOpacity
            style={styles.addSetButton}
            onPress={() => addSet()}
          >
            <Text style={styles.addSetButtonText}>Add Set</Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: colors.primaryDark,
    alignSelf: 'center',
    paddingTop: 5,
    paddingBottom: 15,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    padding: 15,
    color: colors.white,
    fontFamily: 'Verdana',
    fontSize: 16,
  },
  removeExerciseButton: {},
  setsContainer: {},

  addSetButton: {
    backgroundColor: colors.primary,
    margin: 10,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addSetButtonText: {
    color: colors.white,
    fontFamily: 'Verdana',
    fontSize: 14,
  },
  text: {
    color: colors.white,
    fontFamily: 'Verdana',
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  setsHeader: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  sectionOne: {
    flex: 1,
  },
  sectionTwo: {
    flex: 2,
  },
  sectionThree: {
    flex: 2,
  },
  sectionFour: {
    flex: 1,
  },
  setLabel: {
    minWidth: 30,
    color: colors.white,
    textAlign: 'center',
  },
  dontDisplay: {
    display: 'none',
  },
  removeExerciseButtonText: {
    color: colors.red,
    fontWeight: 'bold',
  },
});

export default ExercisesFlatlistItem;
