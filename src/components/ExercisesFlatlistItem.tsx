import React, { FC } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { Exercise } from "../redux/reducers/workoutsReducer";
import colors from "../utils/colors";
import SetItem from "./SetItem";
import * as Actions from "../redux/actions";
import { ReducerState } from "../redux/reducers";

interface Props {
  exercise: Exercise;
  exerciseIndex: number;
  forActiveWorkout?: boolean;
}

const ExercisesFlatlistItem: FC<Props> = (props) => {
  const { exercise, exerciseIndex, forActiveWorkout } = props;
  const dispatch = useDispatch();

  const addSet = () => {
    dispatch(Actions.addSet(exerciseIndex));
  };

  const removeExercise = () => {
    dispatch(Actions.removeExercise(exerciseIndex));
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{exercise.name}</Text>
        {!forActiveWorkout ? (
          <TouchableOpacity
            style={styles.removeExerciseButton}
            onPress={() => removeExercise()}
          >
            <Text
              style={{ ...styles.text, color: colors.red, fontWeight: "bold" }}
            >
              X
            </Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
      <View style={styles.setsContainer}>
        <View
          style={
            exercise.sets.length > 0 ? styles.setsHeader : { display: "none" }
          }
        >
          <Text
            style={{ minWidth: 30, color: colors.white, textAlign: "center" }}
          >
            Set
          </Text>
          <Text style={{ minWidth: 30, color: colors.white }}>Reps</Text>
          <Text style={{ minWidth: 30, color: colors.white }}>Weight</Text>
          <View style={{ minWidth: 30 }}></View>
        </View>
        <FlatList
          data={exercise.sets}
          renderItem={({ item, index }) => (
            <SetItem
              key={index}
              set={item}
              setIndex={index}
              exerciseIndex={exerciseIndex}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <TouchableOpacity style={styles.addSetButton} onPress={() => addSet()}>
          <Text style={styles.addSetButtonText}>Add Set</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.primaryDark,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    padding: 15,
    color: "#fff",
    fontFamily: "Verdana",
    fontSize: 16,
  },
  removeExerciseButton: {},
  setsContainer: {},
  setsHeader: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addSetButton: {
    backgroundColor: colors.primary,
    margin: 10,
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  addSetButtonText: {
    color: "#fff",
    fontFamily: "Verdana",
    fontSize: 14,
  },
  text: {
    color: colors.white,
    fontFamily: "Verdana",
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});

export default ExercisesFlatlistItem;
