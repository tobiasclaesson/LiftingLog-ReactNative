import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  MainScreen,
  CreateWorkoutRoutineScreen,
  AddExerciseScreen,
  ActiveWorkoutScreen,
  HistoryScreen,
  FinishedWorkoutScreen,
} from "../screens";
import { DrawerContent, DrawerIcon } from "../components";
import colors from "../utils/colors";
import { Exercise, Workout } from "../redux/reducers/workoutsReducer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Ionicon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

export type AppStackParamList = {
  MainScreen: undefined;
  CreateWorkoutRoutineScreen: undefined;
  AddExerciseScreen: { exercises: Exercise[] };
  ActiveWorkoutScreen: { title: string; workoutIndex: number };
  HistoryScreen: undefined;
  FinishedWorkoutScreen: { workout: Workout };
};

export type BottomTabParamList = {
  Home: undefined;
  History: undefined;
};

export type DrawerParamList = {
  AppTabNavigator: undefined;
};

const Stack = createStackNavigator<AppStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

const screenOptions = {
  headerTintColor: "#fff",
  headerStyle: {
    backgroundColor: colors.primaryDark,
  },
  headerBackTitle: "Back",
};

const RoutinesStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          title: "LiftingLog",
          headerLeft: (props) => <DrawerIcon {...props} />,
        }}
      />
      <Stack.Screen
        name="CreateWorkoutRoutineScreen"
        component={CreateWorkoutRoutineScreen}
        options={{
          title: "Create Routine",
        }}
      />
      <Stack.Screen
        name="AddExerciseScreen"
        component={AddExerciseScreen}
        options={{
          title: "Add Exercise",
        }}
      />
      <Stack.Screen
        name="ActiveWorkoutScreen"
        component={ActiveWorkoutScreen}
        options={({ route }) => ({
          title: route.params.title,
        })}
      />
    </Stack.Navigator>
  );
};

const HistoryStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="HistoryScreen"
        component={HistoryScreen}
        options={{
          title: "History",
          headerLeft: (props) => <DrawerIcon {...props} />,
        }}
      />
      <Stack.Screen
        name="FinishedWorkoutScreen"
        component={FinishedWorkoutScreen}
        options={({ route }) => ({
          title: route.params.workout.title,
        })}
      />
    </Stack.Navigator>
  );
};
const AppTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: colors.white,
        // activeBackgroundColor: colors.primaryDark,
        inactiveTintColor: colors.black,
        // inactiveBackgroundColor: colors.primary,

        style: {
          backgroundColor: colors.primaryDark,
          borderTopWidth: 1,
          borderTopColor: colors.white,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicon name="barbell-outline" size={size} color={color} />
          ),
        }}
        component={RoutinesStack}
      />
      <Tab.Screen
        name="History"
        options={{
          tabBarLabel: "History",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcon name="history" size={size} color={color} />
          ),
        }}
        component={HistoryStack}
      />
    </Tab.Navigator>
  );
};

const AppStack: FC = () => {
  return (
    <Drawer.Navigator
      drawerPosition="left"
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="AppTabNavigator" component={AppTabNavigator} />
    </Drawer.Navigator>
  );
};

export default AppStack;
