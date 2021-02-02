import React, { FC, useContext, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import * as colors from "../utils/colors";
import { AppStackParamList } from "../navigation/appstack";
import { StackNavigationProp } from "@react-navigation/stack";
import { TextInputField } from "../components";
import { DBContext } from "../context/DBContext";
import { Exercise } from "../reducers/workoutsReducer";

type ProfileScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  "CreateWorkoutRoutineScreen"
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const CreateWorkoutRoutineScreen: FC<Props> = (props) => {
  const { navigation } = props;
  const [title, setTitle] = useState<string>("");
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const { saveWorkoutRoutine } = useContext(DBContext);

  const button = (text: string, onPress: () => void) => {
    return (
      <TouchableOpacity style={styles.button} onPress={() => onPress()}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TextInputField placeholder={"Title"} onChangeText={(e) => setTitle(e)} />
      <View style={styles.buttonContainer}>
        {button("Add Exercise", () => navigation.navigate("AddExerciseScreen"))}
        {button("Save Routine", () => {
          let routine = { title: title, exercises: exercises, key: "" };
          saveWorkoutRoutine(routine, () => navigation.goBack());
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
    backgroundColor: colors.primary,
    paddingTop: 10,
  },
  buttonContainer: {
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingTop: 20,
  },
  button: {
    backgroundColor: colors.primaryDark,
    justifyContent: "center",
    alignItems: "center",
    minWidth: "40%",
    borderRadius: 5,
  },
  buttonText: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    color: colors.white,
    fontFamily: "Verdana",
  },
});

export default CreateWorkoutRoutineScreen;
