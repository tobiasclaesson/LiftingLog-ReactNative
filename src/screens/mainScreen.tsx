import React, { FC, useContext } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { AuthContext } from "../context/AuthContext";
import * as colors from "../utils/colors";

const MainScreen: FC = () => {
  const { signOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>MainScreen</Text>
      <Button title="Log out" onPress={() => signOut()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
});

export default MainScreen;
