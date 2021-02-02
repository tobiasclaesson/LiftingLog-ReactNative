import React, { FC, useContext, useEffect, useState } from "react";
import { View, StyleSheet, Button, FlatList } from "react-native";
import { AuthContext } from "../context/AuthContext";
import * as colors from "../utils/colors";
import * as actions from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { Workout } from "../reducers/workoutsReducer";
import { ReducerState } from "../reducers";
import { WorkoutsListItem, AddWorkoutRoutineButton } from "../components";
import { DBContext } from "../context/DBContext";
import { AppStackParamList } from "../navigation/appstack";
import { StackNavigationProp } from "@react-navigation/stack";

type ProfileScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  "MainScreen"
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const MainScreen: FC<Props> = (props) => {
  const { navigation } = props;
  const { signOut } = useContext(AuthContext);
  const { saveWorkoutRoutine } = useContext(DBContext);
  const { workouts } = useSelector(
    (state: ReducerState) => state.workoutsReducer
  );
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [workoutRoutines, setWorkoutRoutines] = useState<Workout[]>([]);

  useEffect(() => {
    setWorkoutRoutines(workouts);
  }, [workouts]);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.workoutsList}
        data={workoutRoutines}
        renderItem={({ item }) => (
          <WorkoutsListItem
            workout={item}
            onPress={() => {
              console.log("clicking workout");
            }}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 15,
              width: "100%",
              backgroundColor: colors.primary,
            }}
          ></View>
        )}
      />
      <AddWorkoutRoutineButton
        onPress={() => navigation.navigate("CreateWorkoutRoutineScreen")}
      />
      <Button title="Log out" onPress={() => signOut()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  workoutsList: {
    width: "100%",
    paddingTop: 15,
  },
});

export default MainScreen;
