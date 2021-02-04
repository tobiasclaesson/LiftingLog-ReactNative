import React from "react";
import "./src/firebase/firebase";
import { Provider } from "react-redux";
import { store } from "./store/store";
import MainNavigator from "./src/navigation/mainNavigation";
import AuthContextProvider from "./src/context/AuthContext";
import DBContextProvider from "./src/context/DBContext";
import { TouchableOpacity, Text } from "react-native";

export default function App() {
  return (
    <Provider store={store}>
      <DBContextProvider>
        <AuthContextProvider>
          <MainNavigator />
        </AuthContextProvider>
      </DBContextProvider>
    </Provider>
  );
}
