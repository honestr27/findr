import { View, Text } from "react-native";
import React, { createContext, useContext } from "react";
import { ResponseType } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import { auth, db } from "../firebaseConfig";
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    expoClientId:
      "196611832380-oo56tiskuj7h1t2o0u65ngs2vmi0gclb.apps.googleusercontent.com",
    scopes: ["profile", "email"],
    permissions: ["public_profile", "email", "gender", "location"],
  });
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  React.useEffect(() => {
    if (response?.type === "success") {
      const { id_token, accessToken } = response.params;
      const credential = GoogleAuthProvider.credential(id_token, accessToken);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  return (
    <AuthContext.Provider value={{ user, promptAsync, request }}>
      {children}
    </AuthContext.Provider>
  );
};
export default function useAuth() {
  return useContext(AuthContext);
}
