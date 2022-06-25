import { createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import firebaseApp from "../lib/firebase";

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseAuth = getAuth();

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const reducer = (state, action) => {
  if (action.type === "AUTH_STATE_CHANGED") {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  }
  return state;
};

export const AuthContext = createContext({
  ...initialState,
  platform: "Firebase",
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(
    () =>
      onAuthStateChanged(firebaseAuth, (user) => {
        if (user) {
          // Here you should extract the complete user profile to make it available in your entire firebaseApp.
          // The auth state only provides basic information.
          dispatch({
            type: "AUTH_STATE_CHANGED",
            payload: {
              isAuthenticated: true,
              user: {
                id: user.uid,
                avatar: user.photoURL,
                email: user.email,
                name: user.displayName,
              },
            },
          });
        } else {
          dispatch({
            type: "AUTH_STATE_CHANGED",
            payload: {
              isAuthenticated: false,
              user: {
                id: "",
                avatar: "",
                email: "",
                name: "",
              },
            },
          });
        }
      }),
    [dispatch]
  );

  const login = (email, password) =>
    signInWithEmailAndPassword(firebaseAuth, email, password);

  const logout = async () => {
    await firebaseAuth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        platform: "Firebase",
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const AuthConsumer = AuthContext.Consumer;
