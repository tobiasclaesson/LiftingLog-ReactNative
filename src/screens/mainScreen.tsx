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

const MainScreen: FC = () => {
  const { signOut } = useContext(AuthContext);
  const { saveWorkoutRoutine } = useContext(DBContext);
  const { workouts } = useSelector(
    (state: ReducerState) => state.workoutsReducer
  );
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [workoutRoutines, setWorkoutRoutines] = useState<Workout[]>([]);

  useEffect(() => {
    //const subscriber = firebase
  }, []);

  useEffect(() => {
    setWorkoutRoutines(workouts);
  });

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.workoutsList}
        data={workoutRoutines}
        renderItem={({ item }) => (
          <WorkoutsListItem
            workout={item}
            onPress={() => {
              saveWorkoutRoutine(item);
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
      <AddWorkoutRoutineButton />
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
