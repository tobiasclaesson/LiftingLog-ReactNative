import React, { createContext, useState, useEffect, FC } from "react";
import { auth } from "../firebase/firebase";
import firebase from "firebase";
import { Alert } from "react-native";

type PropTypes = {
  children?: React.ReactNode;
};

const initialState = {
  user: auth.currentUser,
  isLoading: true,
  signIn: (email: string, password: string) => {},
  signOut: () => {},
  signUp: (email: string, password: string) => {},
};

export const AuthContext = createContext(initialState);

const AuthContextProvider: FC = (props: PropTypes) => {
  const { children } = props;

  const [user, setUser] = useState<firebase.User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  });

  const signIn = async (email: string, password: string) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log("error:", error);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoading, user, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
