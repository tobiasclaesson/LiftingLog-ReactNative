import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SignUpScreen, LoginScreen } from '../screens';
import colors from '../utils/colors';

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

const screenOptions = {
  headerTintColor: '#fff',
  headerStyle: {
    backgroundColor: colors.primaryDark,
  },
  headerBackTitle: 'Back',
};

const { Navigator, Screen } = createStackNavigator<AuthStackParamList>();

const AuthStack: FC = () => {
  return (
    <Navigator screenOptions={screenOptions}>
      <Screen
        name='Login'
        component={LoginScreen}
        initialParams={undefined}
        options={{
          title: 'LiftingLog',
          headerTitleStyle: {
            color: '#fff',
          },
          headerStyle: {
            backgroundColor: colors.primary,
          },
        }}
      />
      <Screen
        name='Signup'
        component={SignUpScreen}
        initialParams={undefined}
        options={{
          title: 'LiftingLog',
          headerTitleStyle: {
            color: '#fff',
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
