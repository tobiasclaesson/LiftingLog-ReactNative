import React, { FC, useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import firebase from "firebase";
import AppStack from "./appstack";
import AuthStack from "./authstack";
import { AuthContext } from "../context/AuthContext";

const MainNavigator: FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default MainNavigator;
