import React, { FC, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ReducerState } from "../redux/reducers";
import { Set } from "../redux/reducers/workoutsReducer";
import colors from "../utils/colors";
import * as Actions from "../redux/actions";

interface Props {
  set: Set;
  setIndex: number;
  exerciseIndex: number;
}

const SetItem: FC<Props> = (props) => {
  const { set, setIndex, exerciseIndex } = props;
  const { exercises } = useSelector(
    (state: ReducerState) => state.exercisesReducer
  );

  const dispatch = useDispatch();

  const updateReps = (text: string) => {
    exercises[exerciseIndex].sets[setIndex].reps = Number(text);
    dispatch(Actions.updateExercises(exercises));
  };

  const updateWeight = (text: string) => {
    exercises[exerciseIndex].sets[setIndex].weight = Number(text);
    dispatch(Actions.updateExercises(exercises));
  };

  const removeSet = () => {
    dispatch(Actions.removeSet(exerciseIndex, setIndex));
  };

  return (
    <View style={styles.container}>
      <View style={styles.setContainer}>
        <Text style={styles.text}>{setIndex + 1}</Text>
      </View>
      <View style={styles.repsContainer}>
        <TextInput
          style={styles.textInput}
          keyboardType={"numeric"}
          onChangeText={(text) => updateReps(text)}
        >
          {set.reps}
        </TextInput>
      </View>
      <View style={styles.weightContainer}>
        <TextInput
          style={styles.textInput}
          keyboardType={"numeric"}
          onChangeText={(text) => updateWeight(text)}
        >
          {set.weight}
        </TextInput>
      </View>
      <TouchableOpacity onPress={() => removeSet()}>
        <Text style={{ ...styles.text, color: colors.red, fontWeight: "bold" }}>
          X
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
  },
  setContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  repsContainer: {
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  weightContainer: {
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.white,
    fontFamily: "Verdana",
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  textInput: {
    color: "#fff",
    fontFamily: "Verdana",
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});

export default SetItem;
