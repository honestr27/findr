import { View, Text } from "react-native";
import React from "react";

const RecieverMessage = ({ message }) => {
  return (
    <View
      className="bg-white rounded-lg rounded-tr-none px-5 py-3 mx-3 my-2"
      style={{ alignSelf: "flex-start" }}
    >
      <Text className="text-black">{message.message}</Text>
    </View>
  );
};

export default RecieverMessage;
