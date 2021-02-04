import React, { FC, useContext, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import colors from "../utils/colors";
import { AppStackParamList } from "../navigation/appstack";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { ExercisesFlatlist, ExercisesListItem } from "../components";
import { DBContext } from "../context/DBContext";
import { Exercise, Workout } from "../redux/reducers/workoutsReducer";
import { useDispatch } from "react-redux";
import * as Actions from "../redux/actions";

type FinishedWorkoutScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  "FinishedWorkoutScreen"
>;

type Props = {
  navigation: FinishedWorkoutScreenNavigationProp;
  route: RouteProp<{ params: { workout: Workout } }, "params">;
};

const FinishedWorkoutScreen: FC<Props> = (props) => {
  const { navigation, route } = props;

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
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 20,
  },
  exercisesList: {
    width: "100%",
  },
});

export default FinishedWorkoutScreen;
