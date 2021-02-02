import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SignUpScreen, LoginScreen } from "../screens";
import * as colors from "../utils/colors";
import { color } from "react-native-reanimated";

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

const { Navigator, Screen } = createStackNavigator<AuthStackParamList>();

const AuthStack: FC = () => {
  return (
    <Navigator>
      <Screen
        name="Login"
        component={LoginScreen}
        initialParams={undefined}
        options={{
          title: "LiftingLog",
          headerTitleStyle: {
            color: "#fff",
          },
          headerStyle: {
            backgroundColor: colors.primary,
          },
        }}
      />
      <Screen
        name="Signup"
        component={SignUpScreen}
        initialParams={undefined}
        options={{
          title: "LiftingLog",
          headerTitleStyle: {
            color: "#fff",
          },
          headerStyle: {
            backgroundColor: colors.primary,
          },
        }}
      />
    </Navigator>
  );
};

export default AuthStack;
