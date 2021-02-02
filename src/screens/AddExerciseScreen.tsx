import React, { FC, useContext, useEffect } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import * as colors from "../utils/colors";
import { AppStackParamList } from "../navigation/appstack";
import { StackNavigationProp } from "@react-navigation/stack";
import {} from "../components";
import { DBContext } from "../context/DBContext";
import ExercisesListItem from "../components/ExercisesListItem";

type ProfileScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  "AddExerciseScreen"
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const CreateWorkoutRoutineScreen: FC<Props> = (props) => {
  const { navigation } = props;
  const { exercises } = useContext(DBContext);

  useEffect(() => {});

  const addExercise = (name: string) => {
    console.log(name);

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
            onPress={(name) => addExercise(name)}
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
