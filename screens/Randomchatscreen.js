import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfigConfig";
import generatedId from "../libs/generateId";
import useAuth from "../hooks/useAuth";
import LottieView from "lottie-react-native";

const Randomchatscreen = () => {
  const [rprofiles, setRprofiles] = useState([]);
  const { user } = useAuth();
  let selectedUser;

  useEffect(
    () =>
      onSnapshot(query(collection(db, "random")), (snapshot) =>
        setRprofiles(
          snapshot.docs
            .filter((doc) => doc.randomchat !== "true")
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
        )
      ),
    []
  );
  const selectUser = (profiles) => {
    const userIndex = Math.floor(Math.random() * rprofiles.length);
    selectedUser = rprofiles[userIndex];
    return selectedUser;
  };
  selectUser(rprofiles);
  const setMatch = async () => {
    await setDoc(doc(db, "randomRoom", user.uid), {
      userMatched: [user.uid, selectedUser?.id],
      timeStamp: serverTimestamp(),
    });
  };
  setMatch();
  return (
    <SafeAreaView>
      <View className=" bg-white h-full flex justify-content items-center">
        <LottieView
          className="h-100 w-100"
          source={require("../assets/animations/chatmatch.json")}
          autoPlay
        />
      </View>
    </SafeAreaView>
  );
};

export default Randomchatscreen;
