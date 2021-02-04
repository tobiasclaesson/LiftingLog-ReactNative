import React, { FC, useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import colors from "../utils/colors";
import { AppStackParamList } from "../navigation/appstack";
import { StackNavigationProp } from "@react-navigation/stack";

type HistoryScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  "HistoryScreen"
>;

type Props = {
  navigation: HistoryScreenNavigationProp;
};

const HistoryScreen: FC<Props> = (props) => {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <Text>HistoryScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
    backgroundColor: colors.primary,
    paddingTop: 10,
  },
});

export default HistoryScreen;
