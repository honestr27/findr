import { View, Text, Button, Image } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import BottomNavbar from "./BottomNavbar";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";
import generateId from "../libs/generateId";
import * as Location from "expo-location";
const Homescreen = () => {
  const [profiles, setProfiles] = useState([]);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigation = useNavigation();

  const { user } = useAuth();

  useLayoutEffect(() => {
    onSnapshot(doc(db, "users", user.uid), (snapshot) => {
      if (!snapshot.exists()) {
        navigation.navigate("Modal");
      }
    });
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  useEffect(() => {
    const getProfile = async () => {
      const passes = await getDocs(
        collection(db, "users", user.uid, "passes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));
      const swipes = await getDocs(
        collection(db, "users", user.uid, "swipes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));
      const passedUserIds = passes.length > 0 ? passes : ["test"];
      const swipededUserIds = swipes.length > 0 ? swipes : ["test"];
      onSnapshot(
        query(
          collection(db, "users"),
          where("id", "not-in", [...passedUserIds, ...swipededUserIds])
        ),
        (snapshot) => {
          setProfiles(
            snapshot.docs
              .filter((doc) => doc.id !== user.uid)
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
          );
        }
      );
    };
    getProfile();
  }, []);

  const swipeLeft = async (cardIndex) => {
    if (!profiles[cardIndex]) return;
    const userSwiped = profiles[cardIndex];
    setDoc(doc(db, "users", user.uid, "passes", userSwiped.id), userSwiped);
  };

  const swipeRight = async (cardIndex) => {
    if (!profiles[cardIndex]) return;
    const userSwiped = profiles[cardIndex];
    const userLoggedIn = await (
      await getDoc(doc(db, "users", user.uid))
    ).data();

    getDoc(doc(db, "users", userSwiped.id, "swipes", user.uid)).then(
      (documentSnapshot) => {
        if (documentSnapshot.exists()) {
          setDoc(
            doc(db, "users", user.uid, "swipes", userSwiped.id),
            userSwiped
          );

          setDoc(doc(db, "matches", generateId(user.uid, userSwiped.id)), {
            users: {
              [user.uid]: userLoggedIn,
              [userSwiped.id]: userSwiped,
            },
            userMatched: [user.uid, userSwiped.id],
            timeStamp: serverTimestamp(),
          });
          navigation.navigate("Match", {
            userLoggedIn,
            userSwiped,
          });
        } else {
          setDoc(
            doc(db, "users", user.uid, "swipes", userSwiped.id),
            userSwiped
          );
        }
      }
    );
  };
  return (
    <SafeAreaView className=" relative flex-1">
      <View className="fixed top-0 inset-x-0  p-3 ">
        <AntDesign
          onPress={() => navigation.navigate("Chat")}
          name="message1"
          size={30}
          color="black"
        />
      </View>
      <View className="absolute ">
        <Swiper
          containerStyle={{ backgroundColor: "transparent" }}
          cards={profiles}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          onSwipedLeft={(cardIndex) => {
            swipeLeft(cardIndex);
          }}
          onSwipedRight={(cardIndex) => {
            swipeRight(cardIndex);
          }}
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: { textAlign: "right", color: "red" },
              },
            },
            right: {
              title: "LIKE",
              style: {
                label: { color: "green" },
              },
            },
          }}
          renderCard={(card) =>
            card ? (
              <View className=" mt-6 bg-red-500 h-full w-full   rounded-xl">
                <Image
                  className="absolute  h-full w-full rounded-xl"
                  source={{ uri: card.profilePic }}
                />
                <View className=" absolute bottom-0 p-4">
                  <Text className="text-white text-2xl font-bold text-size-30">
                    {card.displayName}
                  </Text>
                </View>
              </View>
            ) : (
              <View className="absolute mt-6  bg-white h-full w-full justify-center">
                <Text className="font-bold"> No more Profiles</Text>
              </View>
            )
          }
        />
      </View>
      <BottomNavbar />
    </SafeAreaView>
  );
};

export default Homescreen;
