import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Homescreen from "./screens/Homescreen";
import Meetscreen from "./screens/Meetscreen";
import Loginscreen from "./screens/Loginscreen";
import Eventscreen from "./screens/Eventscreen";
import useAuth from "./hooks/useAuth";
import Modalscreen from "./screens/Modalscreen";
import Matchscreen from "./screens/Matchscreen";
import Chatscreen from "./screens/Chatscreen";
import Loadingscreen from "./screens/Loadingscreen";
import Privatescreen from "./screens/Privatescreen";
import RandomChat from "./screens/RandomChat";
import Randomchatscreen from "./screens/Randomchatscreen";

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  const { user } = useAuth();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {user ? (
        <>
          <Stack.Group>
            <Stack.Screen name="Home" component={Homescreen} />
            <Stack.Screen name="Meetups" component={Meetscreen} />
            <Stack.Screen name="Events" component={Loadingscreen} />
            <Stack.Screen name="Chat" component={Chatscreen} />
            <Stack.Screen name="PrivateChat" component={Privatescreen} />
            <Stack.Screen name="Random" component={RandomChat} />
            <Stack.Screen name="Randomchat" component={Randomchatscreen} />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen name="Modal" component={Modalscreen} />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
            <Stack.Screen name="Match" component={Matchscreen} />
          </Stack.Group>
        </>
      ) : (
        <Stack.Screen name="Login" component={Loginscreen} />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
