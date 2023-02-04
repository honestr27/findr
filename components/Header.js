import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons, MaterialIcons, Foundation } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Header = ({ title, callEnabled }) => {
  const navigation = useNavigation();
  callEnabled = true;
  return (
    <View className="flex  border-black shadow-lg pt-4">
      <View className="flex flex-row justify-evenly items-center">
        <TouchableOpacity className="p-2" onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-sharp" size={30} color="black" />
        </TouchableOpacity>

        {callEnabled && (
          <TouchableOpacity className="p-2" onPress={() => navigation.goBack()}>
            <Foundation name="telephone" size={30} color="black" />
          </TouchableOpacity>
        )}
        <TouchableOpacity className="p-2" onPress={() => navigation.goBack()}>
          <MaterialIcons name="videocam" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
