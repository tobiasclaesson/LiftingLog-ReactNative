import React, { FC, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicon from 'react-native-vector-icons/Ionicons';
import colors from '../utils/colors';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useDispatch } from 'react-redux';
import * as Actions from '../redux/actions';

const DrawerContent: FC<DrawerContentComponentProps> = (props) => {
  const { navigation } = props;
  const { signOut } = useContext(AuthContext);
  const dispatch = useDispatch();

  const button = (
    title: string,
    onPress: () => void,
    isSignOutButton?: boolean
  ) => {
    return (
      <TouchableOpacity
        style={
          !isSignOutButton
            ? styles.buttonContainer
            : [styles.buttonContainer, styles.logOutButtonExtension]
        }
        onPress={() => onPress()}
        containerStyle={
          !isSignOutButton
            ? styles.buttonContainerStyle
            : styles.logOutButtonContainerStyleExtension
        }
      >
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.drawerTitleContainer}>
        <Ionicon name='barbell-outline' size={30} color={colors.white} />
        <Text style={styles.drawerTitle}>Lifting Log</Text>
      </View>
      {button('Home', () => navigation.navigate('Home'))}
      {button('History', () => navigation.navigate('History'))}
      {button(
        'Log Out',
        () => {
          signOut();
          dispatch(
            Actions.updateWorkouts([
              {
                title: '',
                exercises: [
                  {
                    name: '',
                    sets: [{ reps: 0, weight: 0 }],
                  },
                ],
                key: '',
              },
            ])
          );
          navigation.closeDrawer();
        },
        true
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    paddingVertical: '30%',
    backgroundColor: colors.primaryLight,
  },

  drawerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: colors.white,
    borderBottomWidth: 2,
    width: '100%',
    paddingBottom: 10,
  },
  drawerTitle: {
    color: colors.white,
    fontFamily: 'Verdana',
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 5,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomColor: colors.white,
    borderBottomWidth: 2,
    backgroundColor: colors.primary,
  },
  buttonContainerStyle: {
    width: '100%',
  },
  buttonText: {
    color: colors.white,
    fontFamily: 'Verdana',
    fontSize: 16,
  },
  logOutButtonExtension: {
    borderTopColor: colors.white,
    borderTopWidth: 2,
  },
  logOutButtonContainerStyleExtension: {
    width: '100%',
    bottom: 60,
    position: 'absolute',
  },
});

export default DrawerContent;
