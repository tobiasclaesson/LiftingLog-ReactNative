import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MainScreen } from "../screens";
import * as colors from "../utils/colors";

type AppStackParamList = {
  MainScreen: undefined;
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
          headerTitleStyle: {
            color: "#fff",
          },
          headerStyle: {
            backgroundColor: colors.primaryDark,
          },
        }}
      />
    </Navigator>
  );
};

export default AppStack;
