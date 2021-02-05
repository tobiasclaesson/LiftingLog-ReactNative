import React, { FC, useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInputField } from '../components';
import { AuthContext } from '../context/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import colors from '../utils/colors';

type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

type ProfileScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'Login'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const App: FC<Props> = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useContext(AuthContext);

  const button = (title: string, onPress: () => void): React.ReactNode => {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          onPress();
        }}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TextInputField
        placeholder='Email'
        onChangeText={(text) => setEmail(text)}
        keyboardType={'email-address'}
      />
      <TextInputField
        placeholder='Password'
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <View style={styles.buttonContainer}>
        {button('Sign up', () => {
          props.navigation.navigate('Signup');
        })}
        {button('Log in', () => {
          signIn(email, password);
        })}
      </View>
      {/* FOR TESTING */}
      {button('LOGIN TEST USER', () => {
        signIn('t@c.com', '123456');
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: colors.primaryDark,
    borderRadius: 5,
    marginTop: 15,
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    padding: 15,
    paddingHorizontal: 20,
    color: colors.white,
  },
});

export default App;
