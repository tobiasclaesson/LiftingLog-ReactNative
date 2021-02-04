import React, { FC } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Exercise } from "../redux/reducers/workoutsReducer";
import colors from "../utils/colors";
import ExercisesFlatlistItem from "./ExercisesFlatlistItem";

interface Props {
  exercises: Exercise[];
  forActiveWorkout?: boolean;
}

const ExercisesFlatlist: FC<Props> = (props) => {
  const { exercises, forActiveWorkout } = props;

  return (
    <View style={{ width: "90%" }}>
      <FlatList
        data={exercises}
        renderItem={({ item, index }) => (
          <ExercisesFlatlistItem
            exercise={item}
            exerciseIndex={index}
            forActiveWorkout={forActiveWorkout || false}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ExercisesFlatlist;
