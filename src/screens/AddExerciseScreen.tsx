import React, { FC, useContext, useEffect } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import colors from "../utils/colors";
import { AppStackParamList } from "../navigation/appstack";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { ExercisesListItem } from "../components";
import { DBContext } from "../context/DBContext";
import { Exercise } from "../redux/reducers/workoutsReducer";
import { useDispatch } from "react-redux";
import * as Actions from "../redux/actions";

type AddExerciseScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  "AddExerciseScreen"
>;

type Props = {
  navigation: AddExerciseScreenNavigationProp;
  route: RouteProp<{ params: { exercises: Exercise[] } }, "params">;
};

const CreateWorkoutRoutineScreen: FC<Props> = (props) => {
  const { navigation, route } = props;
  const { exercises } = useContext(DBContext);
  const dispatch = useDispatch();

  useEffect(() => {});

  const onPressedExercise = (name: string) => {
    const exercises = route.params.exercises;
    const exercise: Exercise = {
      name: name,
      sets: [{ reps: 0, weight: 0 }],
    };
    dispatch(Actions.updateExercises([...exercises, exercise]));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.exercisesList}
        data={exercises}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <ExercisesListItem
            name={item}
            onPress={() => onPressedExercise(item)}
          />
        )}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 0.5,
              width: "100%",
              backgroundColor: colors.white,
            }}
          ></View>
        )}
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
  },
  exercisesList: {
    width: "100%",
  },
});

export default CreateWorkoutRoutineScreen;
