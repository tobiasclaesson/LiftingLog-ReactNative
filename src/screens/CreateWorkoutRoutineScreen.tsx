import React, { FC, useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import colors from "../utils/colors";
import { AppStackParamList } from "../navigation/appstack";
import { StackNavigationProp } from "@react-navigation/stack";
import { ExercisesFlatlist, TextInputField } from "../components";
import { DBContext } from "../context/DBContext";
import { Exercise } from "../redux/reducers/workoutsReducer";
import { useDispatch, useSelector } from "react-redux";
import { ReducerState } from "../redux/reducers";
import * as Actions from "../redux/actions";

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
  const exercises_ = useSelector(
    (state: ReducerState) => state.exercisesReducer
  );
  const exercises = exercises_.exercises;

  const dispatch = useDispatch();

  const { saveWorkoutRoutine } = useContext(DBContext);

  useEffect(() => {
    dispatch(Actions.updateExercises([]));
  }, []);

  const button = (text: string, onPress: () => void) => {
    return (
      <TouchableOpacity style={styles.button} onPress={() => onPress()}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ExercisesFlatlist
        exercises={exercises}
        flatlistHeader={
          <TextInputField
            placeholder={"Title"}
            onChangeText={(e) => setTitle(e)}
            shouldAutoFocus={true}
          />
        }
        flatlistFooter={
          <View style={styles.buttonContainer}>
            {button("Add Exercise", () =>
              navigation.navigate("AddExerciseScreen", { exercises })
            )}
            {button("Save Routine", () => {
              let routine = { title: title, exercises: exercises, key: "" };
              dispatch(Actions.updateExercises([]));
              saveWorkoutRoutine(routine, () => navigation.goBack());
            })}
          </View>
        }
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
    paddingTop: 10,
  },
  buttonContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingTop: 20,
    marginBottom: 30,
    width: "90%",
    alignSelf: "center",
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
