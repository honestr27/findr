import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import {
  Button,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";

WebBrowser.maybeCompleteAuthSession();

export default function Loginscreen() {
  const { promptAsync, request } = useAuth();
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View className="flex-1">
      <ImageBackground
        className="flex-1"
        resizeMode="cover"
        source={{
          uri: "https://birchtree.nyc3.digitaloceanspaces.com/2020-uploads/wallpapers/today_at_apple_2_iphone.png",
        }}
      >
        <TouchableOpacity
          disabled={!request}
          onPress={() => {
            promptAsync();
          }}
          className=" flex flex-row absolute mx-14 bg-white w-60  bottom-40 p-4 rounded-2xl"
        >
          <Image
            className="  h-8 w-8"
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png",
            }}
          ></Image>
          <Text className="text-center text-lg mx-6">SignIn with Google</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}
