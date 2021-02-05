import React, { FC, useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import colors from '../utils/colors';
import { AppStackParamList } from '../navigation/appstack';
import { StackNavigationProp } from '@react-navigation/stack';
import { DBContext } from '../context/DBContext';
import { Workout } from '../redux/reducers/workoutsReducer';
import { WorkoutsListItem } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerState } from '../redux/reducers';
import * as Actions from '../redux/actions';

type HistoryScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'HistoryScreen'
>;

type Props = {
  navigation: HistoryScreenNavigationProp;
};

const HistoryScreen: FC<Props> = (props) => {
  const { navigation } = props;
  const { getHistoryFromDB } = useContext(DBContext);
  const { finishedWorkouts } = useSelector(
    (state: ReducerState) => state.workoutsReducer
  );
  const dispatch = useDispatch();

  const [finishedWorkoutRoutines, setFinishedWorkoutRoutines] = useState<
    Workout[]
  >([]);

  useEffect(() => {
    setFinishedWorkoutRoutines(sortByFinishedDate(finishedWorkouts));
  }, [finishedWorkouts]);

  useEffect(() => {
    getHistoryFromDB().then((value) => {
      dispatch(Actions.updateFinishedWorkouts(value));
    });
  }, []);

  function getTime(date?: Date) {
    return date != null ? date.getTime() : 0;
  }

  function sortByFinishedDate(myArray: Workout[]): Workout[] {
    console.log('sorting');

    myArray.sort((a: Workout, b: Workout) => {
      return getTime(b.finishedDate) - getTime(a.finishedDate);
    });
    return myArray;
  }

  const EmptyListComponent = () => {
    return (
      <View style={styles.EmptyListComponentContainer}>
        <Text style={styles.text}>History List is empty</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.workoutsList}
        data={finishedWorkoutRoutines}
        renderItem={({ item }) => (
          <WorkoutsListItem
            workout={item}
            forHistory={true}
            onPress={() => {
              navigation.navigate('FinishedWorkoutScreen', {
                workout: {
                  title: item.title,
                  exercises: item.exercises,
                  key: item.key,
                },
              });
            }}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => (
          <View style={styles.itemSeperator}></View>
        )}
        ListEmptyComponent={() => EmptyListComponent()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    backgroundColor: colors.primary,
    paddingTop: 10,
  },
  workoutsList: {
    width: '100%',
    paddingTop: 15,
  },
  EmptyListComponentContainer: {
    backgroundColor: colors.primaryDark,
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
    paddingVertical: 30,
  },
  text: {
    color: colors.white,
    fontFamily: 'Verdana',
    fontSize: 18,
  },
  itemSeperator: {
    height: 15,
    width: '100%',
    backgroundColor: colors.primary,
  },
});

export default HistoryScreen;
