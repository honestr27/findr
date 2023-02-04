import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigation } from "@react-navigation/native";

const Modalscreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState(null);
  const [job, setJob] = useState(null);
  const [age, setAge] = useState(null);
  const incompleteForm = !profileImage || !job || !age;
  const updateUserProfile = () => {
    setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      displayName: user.displayName,
      profilePic: profileImage,
      job: job,
      age: age,
    }).then(() => {
      navigation.navigate("Home");
    });
  };
  return (
    <View className="flex-1 items-center pt-5">
      <Text className="font-bold text-xl p-2 text-gray-500">
        Welcome {user.displayName}
      </Text>
      <Text className="text-red-500 font-bold p-1"> Upload Profile Pic </Text>
      <TextInput
        value={profileImage}
        onChangeText={setProfileImage}
        className="pb-2 text-xl text-center"
        placeholder="Enter picture URL"
      ></TextInput>
      <Text className="text-red-500 font-bold p-1"> Upload Profile Pic </Text>
      <TextInput
        value={job}
        onChangeText={setJob}
        className="pb-2 text-xl text-center"
        placeholder="Enter your occupation"
      ></TextInput>
      <Text className="text-red-500 font-bold p-1"> Upload Profile Pic </Text>
      <TextInput
        className="pb-2 text-xl text-center"
        placeholder="Enter your Age"
        value={age}
        onChangeText={setAge}
      ></TextInput>
      <TouchableOpacity
        disabled={incompleteForm}
        onPress={updateUserProfile}
        className="w-64 p-3 bg-red-400 rounded-xl absolute bottom-0"
      >
        <Text className="text-white text-center text-xl">Submit </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Modalscreen;
