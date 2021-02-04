import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../utils/colors";

interface Props {
  name: string;
  onPress: (name: string) => void;
}

const ExercisesListItem: FC<Props> = (props) => {
  const { name, onPress } = props;

  return (
    <TouchableOpacity
      onPress={() => {
        onPress(name);
      }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.primaryDark,
    alignSelf: "center",
  },

  title: {
    padding: 25,
    color: "#fff",
    fontFamily: "Verdana",
    fontSize: 18,
  },
});

export default ExercisesListItem;
