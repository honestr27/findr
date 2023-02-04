import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import userMatches from "../libs/userMatches";

const Chatrow = ({ matchdetails }) => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [userMatchedInfo, setUserMatchedInfo] = useState(null);

  useEffect(() => {
    setUserMatchedInfo(userMatches(matchdetails.users, user.uid));
  }, [matchdetails, user]);
  console.log(userMatchedInfo?.profilePic);
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("PrivateChat", {
          matchdetails,
        })
      }
      className="flex-row items-center bg-white py-3 px-5 mx-3 my-1 rounded-lg "
    >
      <Image
        className="rounded-full h-16 w-16 mr-4"
        source={{ uri: userMatchedInfo?.profilePic }}
      />
      <View>
        <Text className="text-lg font-semibold">
          {userMatchedInfo?.displayName}
        </Text>
        <Text>Hi!</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Chatrow;
