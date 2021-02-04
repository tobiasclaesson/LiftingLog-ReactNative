import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Workout } from "../redux/reducers/workoutsReducer";
import colors from "../utils/colors";

interface Props {
  workout: Workout;
  onPress: () => void;
}

const WorkoutsListItem: FC<Props> = (props) => {
  const { workout, onPress } = props;

  return (
    <TouchableOpacity onPress={() => onPress()}>
      <View style={styles.container}>
        <Text style={styles.title}>{workout.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    backgroundColor: colors.primaryDark,
    alignSelf: "center",
    borderRadius: 3,
  },
  title: {
    padding: 20,
    paddingBottom: 50,
    color: "#fff",
    fontFamily: "Verdana",
    fontSize: 18,
  },
});

export default WorkoutsListItem;
