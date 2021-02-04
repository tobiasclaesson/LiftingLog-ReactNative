import React, { FC, useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import colors from "../utils/colors";
import { AppStackParamList } from "../navigation/appstack";
import { StackNavigationProp } from "@react-navigation/stack";
import { DBContext } from "../context/DBContext";
import { Workout } from "../redux/reducers/workoutsReducer";
import { WorkoutsListItem } from "../components";

type HistoryScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  "HistoryScreen"
>;

type Props = {
  navigation: HistoryScreenNavigationProp;
};

const HistoryScreen: FC<Props> = (props) => {
  const { navigation } = props;
  const { historyIsLoading, getHistoryFromDB } = useContext(DBContext);
  const [finishedWorkouts, setFinishedWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    getHistoryFromDB().then(setFinishedWorkouts);
  }, []);

  const EmptyListComponent = () => {
    return (
      <View style={styles.EmptyListComponentContainer}>
        <Text style={styles.text}>Workout routine List is empty</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.workoutsList}
        data={finishedWorkouts}
        renderItem={({ item, index }) => (
          <WorkoutsListItem
            workout={item}
            forHistory={true}
            onPress={() => {
              navigation.navigate("FinishedWorkoutScreen", {
                workout: item,
              });
            }}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 15,
              width: "100%",
              backgroundColor: colors.primary,
            }}
          ></View>
        )}
        ListEmptyComponent={() => EmptyListComponent()}
      />
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
  workoutsList: {
    width: "100%",
    paddingTop: 15,
  },
  addButtonContainer: {
    width: "100%",
  },
  EmptyListComponentContainer: {
    backgroundColor: colors.primaryDark,
    alignItems: "center",
    alignSelf: "center",
    width: "90%",
    paddingVertical: 30,
  },
  text: {
    color: colors.white,
    fontFamily: "Verdana",
    fontSize: 18,
  },
});

export default HistoryScreen;
