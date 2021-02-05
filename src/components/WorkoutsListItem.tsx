import React, { FC, useContext } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Workout } from '../redux/reducers/workoutsReducer';
import colors from '../utils/colors';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DBContext } from '../context/DBContext';

interface Props {
  workout: Workout;
  onPress: () => void;
  forHistory?: boolean;
}

const WorkoutsListItem: FC<Props> = (props) => {
  const { workout, onPress, forHistory } = props;
  let dateString = '';
  if (workout.finishedDate) {
    dateString = compareDates(workout.finishedDate);
  }

  const { removeWorkoutRoutine } = useContext(DBContext);

  function compareDates(date2: Date): string {
    const date1 = new Date();

    const diff = date1.getTime() - date2.getTime();

    const diffDays = Math.floor(diff / (1000 * 3600 * 24));

    if (diffDays > 0) {
      return `${Math.abs(diffDays)} days ago`;
    } else {
      return 'Today';
    }
  }

  const removeWorkout = (id: string) => {
    Alert.alert(
      'Deleting workout routine',
      `Are you sure that you want to delete ${workout.title}?`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => removeWorkoutRoutine(id),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <TouchableOpacity onPress={() => onPress()}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{workout.title}</Text>
          <TouchableOpacity onPress={() => removeWorkout(workout.key)}>
            {!forHistory ? (
              <MaterialCommunityIcon
                name='delete-forever'
                size={30}
                color={colors.red}
              />
            ) : null}
          </TouchableOpacity>
        </View>
        {!forHistory ? (
          <></>
        ) : (
          <Text style={styles.dateText}>{dateString}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: colors.primaryDark,
    alignSelf: 'center',
    borderRadius: 3,
    padding: 20,
    paddingBottom: 50,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: colors.white,
    fontFamily: 'Verdana',
    fontSize: 18,
  },
  dateText: {
    color: colors.white,
    marginTop: 10,
  },
});

export default WorkoutsListItem;
