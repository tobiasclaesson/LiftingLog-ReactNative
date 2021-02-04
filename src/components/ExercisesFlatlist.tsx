import React, { FC } from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import { Exercise } from "../redux/reducers/workoutsReducer";
import colors from "../utils/colors";
import ExercisesFlatlistItem from "./ExercisesFlatlistItem";

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
    <View style={{ width: "100%" }}>
      <FlatList
        data={exercises}
        style={{ alignSelf: "center", width: "100%" }}
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
  listItem: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ExercisesFlatlist;
