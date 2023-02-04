import { View, Text } from "react-native";
import React from "react";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const BottomNavbar = () => {
  const navigation = useNavigation();
  return (
    <View className="  absolute flex flex-row justify-between  bottom-0 inset-x-0 shadow-sm  bg-white p-3 ">
      <AntDesign name="home" size={33} color="pink" />
      <AntDesign
        onPress={() => navigation.navigate("Meetups")}
        name="find"
        size={30}
        color="black"
      />
      <MaterialIcons
        onPress={() => navigation.navigate("Events")}
        name="group-work"
        size={30}
        color="black"
      />
      <Ionicons
        onPress={() => navigation.navigate("Random")}
        name="infinite-sharp"
        size={30}
        color="black"
      />
    </View>
  );
};

export default BottomNavbar;
