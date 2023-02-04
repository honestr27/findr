import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import Chatrow from "./Chatrow";

const Chatlist = () => {
  const [matches, setMatches] = useState([]);
  const { user } = useAuth();
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matches"),
          where("userMatched", "array-contains", user.uid)
        ),
        (snapshot) =>
          setMatches(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ),

    [user]
  );
  console.log(matches);

  return matches.length > 0 ? (
    <FlatList
      className="h-full"
      data={matches}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Chatrow matchdetails={item} />}
    />
  ) : (
    <View>
      <Text>No more matches</Text>
    </View>
  );
};

export default Chatlist;
