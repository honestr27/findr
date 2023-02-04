import {
  View,
  Text,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuth from "../hooks/useAuth";
import userMatches from "../libs/userMatches";
import { useRoute } from "@react-navigation/native";
import SenderMessage from "../components/SenderMessage";
import RecieverMessage from "../components/RecieverMessage";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

const Privatescreen = () => {
  const { user } = useAuth();
  const { params } = useRoute();
  const { matchdetails } = params;
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState({});

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "matches", matchdetails.id, "messages"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
    );
  }, [matchdetails, db]);
  const sendMessage = () => {
    addDoc(collection(db, "matches", matchdetails.id, "messages"), {
      timestamp: serverTimestamp(),
      userId: user.uid,
      displayName: user.displayName,
      profilePic: matchdetails.users[user.uid].profilePic,
      message: input,
    });
    setInput("");
  };
  return (
    <SafeAreaView className="flex-1">
      <Header title={userMatches(matchdetails?.users, user.uid).displayName} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={10}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={messages}
            className="pl-4"
            keyExtractor={(item) => item.id}
            inverted={-1}
            renderItem={({ item: message }) =>
              message.userId === user.uid ? (
                <SenderMessage key={message.id} message={message} />
              ) : (
                <RecieverMessage key={message.id} message={message} />
              )
            }
          />
        </TouchableWithoutFeedback>

        <View className="flex-row justify-between items-center border-t border-gray-200 px-5 py-2">
          <TextInput
            className="h-10 text-lg"
            placeholder="Send Message..."
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            value={input}
          />
          <TouchableOpacity className="h-6" onPress={sendMessage} title="send">
            <Text className="text-pink-600 "> Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Privatescreen;
