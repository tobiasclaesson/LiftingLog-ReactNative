import React, { createContext, useState, useEffect, FC } from "react";
import { auth } from "../firebase/firebase";
import firebase from "firebase";

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
    console.log("calling log in ");
    try {
      await auth.signInWithEmailAndPassword(email, password);
      console.log("logIn ");
    } catch (error) {
      console.log("error: ", error);
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
      alert("Authing up baby");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoading, user, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
