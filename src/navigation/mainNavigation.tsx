import React, { FC, useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import firebase from "firebase";
import AppStack from "./appstack";
import AuthStack from "./authstack";
import { SplashScreen } from "../screens";
import { AuthContext } from "../context/AuthContext";

const MainNavigator: FC = () => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default MainNavigator;
