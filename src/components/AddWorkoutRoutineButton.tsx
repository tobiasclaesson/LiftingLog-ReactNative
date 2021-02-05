import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../utils/colors';

interface Props {
  onPress: () => void;
}

const AddWorkoutRoutineButton: FC<Props> = (props) => {
  const { onPress } = props;

  return (
    <TouchableOpacity onPress={() => onPress()}>
      <View style={styles.container}>
        <Text style={styles.title}>Add Workout Routine</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryDark,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 20,
    width: '90%',
    borderColor: colors.primaryLight,
    borderWidth: 2,
  },
  title: {
    padding: 20,

    color: colors.white,
    fontFamily: 'Verdana',
    fontSize: 18,
  },
});

export default AddWorkoutRoutineButton;
