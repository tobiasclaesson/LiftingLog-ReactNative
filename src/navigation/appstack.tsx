import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  MainScreen,
  CreateWorkoutRoutineScreen,
  AddExerciseScreen,
} from "../screens";
import * as colors from "../utils/colors";

export type AppStackParamList = {
  MainScreen: undefined;
  CreateWorkoutRoutineScreen: undefined;
  AddExerciseScreen: undefined;
};

const { Navigator, Screen } = createStackNavigator<AppStackParamList>();

const AppStack: FC = () => {
  return (
    <Navigator>
      <Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          title: "LiftingLog",
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: colors.primaryDark,
          },
        }}
      />
      <Screen
        name="CreateWorkoutRoutineScreen"
        component={CreateWorkoutRoutineScreen}
        options={{
          title: "Create Routine",
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: colors.primaryDark,
          },
        }}
      />
      <Screen
        name="AddExerciseScreen"
        component={AddExerciseScreen}
        options={{
          title: "Add Exercise",
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: colors.primaryDark,
          },
        }}
      />
    </Navigator>
  );
};

export default AppStack;
