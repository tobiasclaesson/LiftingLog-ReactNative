import React, { FC, useContext, useEffect, useState } from "react";
import { View, StyleSheet, Button, FlatList } from "react-native";
import { AuthContext } from "../context/AuthContext";
import colors from "../utils/colors";
import * as actions from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Workout } from "../redux/reducers/workoutsReducer";
import { ReducerState } from "../redux/reducers";
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
  const { workouts } = useSelector(
    (state: ReducerState) => state.workoutsReducer
  );

  const [workoutRoutines, setWorkoutRoutines] = useState<Workout[]>([]);

  useEffect(() => {
    setWorkoutRoutines(workouts);
  }, [workouts]);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.workoutsList}
        data={workoutRoutines}
        renderItem={({ item, index }) => (
          <WorkoutsListItem
            workout={item}
            onPress={() => {
              navigation.navigate("ActiveWorkoutScreen", {
                title: item.title,
                workoutIndex: index,
              });
            }}
          />
        )}
        keyExtractor={(item) => item.key}
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
      <View style={styles.addButtonContainer}>
        <AddWorkoutRoutineButton
          onPress={() => navigation.navigate("CreateWorkoutRoutineScreen")}
        />
      </View>
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
  addButtonContainer: {
    width: "100%",
  },
});

export default MainScreen;
