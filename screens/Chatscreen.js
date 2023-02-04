import { View, Text } from "react-native";
import React from "react";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import Chatlist from "../components/Chatlist";

const Chatscreen = () => {
  return (
    <SafeAreaView>
      <View>
        <Header title="chats"></Header>
        <Chatlist></Chatlist>
      </View>
    </SafeAreaView>
  );
};

export default Chatscreen;
