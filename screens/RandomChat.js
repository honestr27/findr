import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

const RandomChat = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  const updateUserProfile = () => {
    setDoc(doc(db, "random", user.uid), {
      username: user.displayName,
      randomchat: true,
    }).then(() => {
      navigation.navigate("Randomchat");
    });
  };
  console.log(user);
  return (
    <SafeAreaView className="bg-white h-full">
      <View className=" bg-white h-64  ">
        <LottieView
          className="h-100 w-100"
          source={require("../assets/animations/randomChatstarter.json")}
          autoPlay
        />
      </View>
      <View className="flex items-center justify-content">
        <Text className="text-3xl  font-bold">Talk With Strangers...</Text>
        <Text className="text-slate-500 text-xl font-bold mt-4 leading-8">
          {"      "}Chat with the strangers to know eachother better and have a
          nice compatibility.Extend your relationship with your partners.
        </Text>
        <TouchableOpacity
          className="  w-64 p-3 bg-red-400 mt-10 self-center  rounded-xl "
          onPress={() => updateUserProfile()}
        >
          <Text className="text-white text-center text-xl">Submit </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RandomChat;
