import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Workout } from "../reducers/workoutsReducer";
import * as colors from "../utils/colors";

interface Props {}

const AddWorkoutRoutineButton: FC<Props> = (props) => {
  const {} = props;

  return (
    <TouchableOpacity
      onPress={() => console.log("navigating to addRoutineScreen")}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Add Workout Routine</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryDark,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    zIndex: 1,
  },
  title: {
    padding: 20,

    color: "#fff",
    fontFamily: "Verdana",
    fontSize: 18,
    zIndex: -1,
    position: "relative",
  },
});

export default AddWorkoutRoutineButton;
