import React, { FC, useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  FlatList,
  Text,
  ActivityIndicator,
} from "react-native";
import { DBContext } from "../context/DBContext";
import colors from "../utils/colors";
import { useDispatch, useSelector } from "react-redux";
import { Workout } from "../redux/reducers/workoutsReducer";
import { ReducerState } from "../redux/reducers";
import { WorkoutsListItem, AddWorkoutRoutineButton } from "../components";
import { AppStackParamList } from "../navigation/appstack";
import { StackNavigationProp } from "@react-navigation/stack";
import * as Actions from "../redux/actions";

type MainScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  "MainScreen"
>;

type Props = {
  navigation: MainScreenNavigationProp;
};

const MainScreen: FC<Props> = (props) => {
  const { navigation } = props;
  const { workoutIsLoading, getWorkoutsFromDB } = useContext(DBContext);
  const { workouts } = useSelector(
    (state: ReducerState) => state.workoutsReducer
  );
  const dispatch = useDispatch();

  const [workoutRoutines, setWorkoutRoutines] = useState<Workout[]>([]);

  useEffect(() => {
    setWorkoutRoutines(workouts);
  }, [workouts]);

  useEffect(() => {
    getWorkoutsFromDB().then((value) => {
      dispatch(Actions.updateWorkouts(value));
    });
  }, []);

  const EmptyListComponent = () => {
    return (
      <View style={styles.EmptyListComponentContainer}>
        <Text style={styles.text}>Workout routine List is empty</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {!workoutIsLoading ? (
        <>
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
            ListEmptyComponent={() => EmptyListComponent()}
          />
          <View style={styles.addButtonContainer}>
            <AddWorkoutRoutineButton
              onPress={() => navigation.navigate("CreateWorkoutRoutineScreen")}
            />
          </View>
        </>
      ) : (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}
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
  EmptyListComponentContainer: {
    backgroundColor: colors.primaryDark,
    alignItems: "center",
    alignSelf: "center",
    width: "90%",
    paddingVertical: 30,
  },
  text: {
    color: colors.white,
    fontFamily: "Verdana",
    fontSize: 18,
  },
});

export default MainScreen;
