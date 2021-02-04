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
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { color } from "react-native-reanimated";

interface Props {
  set: Set;
  setIndex: number;
  exerciseIndex: number;
  forFinishedWorkout?: boolean;
}

const SetItem: FC<Props> = (props) => {
  const { set, setIndex, exerciseIndex, forFinishedWorkout } = props;
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

      {!forFinishedWorkout ? (
        <View style={styles.repsContainer}>
          <TextInput
            style={styles.textInput}
            keyboardType={"numeric"}
            onChangeText={(text) => updateReps(text)}
            autoCompleteType="off"
            autoCorrect={false}
            selectTextOnFocus={true}
          >
            {set.reps}
          </TextInput>
        </View>
      ) : (
        <View style={styles.repsContainer}>
          <Text style={styles.textInput}>{set.reps}</Text>
        </View>
      )}

      {!forFinishedWorkout ? (
        <View style={styles.weightContainer}>
          <TextInput
            style={styles.textInput}
            keyboardType={"numeric"}
            onChangeText={(text) => updateWeight(text)}
            autoCompleteType="off"
            autoCorrect={false}
            selectTextOnFocus={true}
          >
            {set.weight}
          </TextInput>
        </View>
      ) : (
        <View style={styles.weightContainer}>
          <Text style={styles.textInput}>{set.weight}</Text>
        </View>
      )}

      <View style={styles.iconContainer}>
        {!forFinishedWorkout ? (
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => removeSet()}
          >
            <MaterialCommunityIcon
              name="delete-forever"
              size={30}
              color={colors.red}
              style={{ alignSelf: "center" }}
            />
          </TouchableOpacity>
        ) : (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialCommunityIcon
              name="delete-forever"
              size={30}
              color={colors.red}
              style={{ display: "none" }}
            />
          </View>
        )}
      </View>
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

    flex: 1,
  },
  repsContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 2,
  },
  weightContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 2,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
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
    backgroundColor: colors.primary,
  },
});

export default SetItem;
