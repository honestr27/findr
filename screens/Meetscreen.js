import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  Platform,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { decode } from "base-64";
import * as ImagePicker from "expo-image-picker";
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

if (typeof atob === "undefined") {
  global.atob = decode;
}
const Meetscreen = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(null);
  const [quote, setQuote] = useState(null);
  const [title, setTitle] = useState(null);

  const uploadPost = async () => {
    if (loading) return;

    setLoading(true);

    const docRef = await addDoc(collection(db, "matchups"), {
      category: category,
      quote: quote,
      title: title,
      timestamp: serverTimestamp(),
    });
    console.log(docRef.id);
    const imageRef = ref(storage, `matchUps/${docRef.id}/image`);
    await uploadString(imageRef, "data:base64," + image, "data_url").then(
      async (snapshot) => {
        const downloadUrl = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "matchups", docRef.id), {
          image: downloadUrl,
        });
      }
    );
    setLoading(false);
    setImage(null);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const demoImage =
    "https://firebasestorage.googleapis.com/v0/b/frindly-a626b.appspot.com/o/matchUps%2FRyounySvLpXl1oqgdWk8%2Fimage?alt=media&token=2f981297-efb5-4368-b133-f767fb7f2b7d";
  console.log(quote);
  return (
    <SafeAreaView>
      <View>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
         <View style={{ height: 200, overflow: 'hidden' }}>
        <Image
          source={{ uri: "data:image/png;base64," + demoImage }}
          style={{ width: 200, height: 200 }}
        />
        </View>
        <View className="bg-grey-500 p-4 text-white rounded-sm m-5">
          <TextInput
            value={category}
            onChangeText={(e) => setCategory(e)}
            placeholder="Category"
          ></TextInput>
        </View>
        <View className="bg-grey-500 p-4 text-white rounded-sm m-5">
          <TextInput
            value={quote}
            onChangeText={(e) => setQuote(e)}
            placeholder="Quote"
          ></TextInput>
        </View>
        <View className="bg-grey-500 p-4 text-white rounded-sm m-5">
          <TextInput
            value={title}
            onChangeText={(e) => setTitle(e)}
            placeholder="Title"
          ></TextInput>
        </View>

        <TouchableOpacity
          onPress={() => uploadPost()}
          className="bg-pink-500 p-4 text-white hover:bg-pink-500 m-10 rounded-sm"
        >
          <Text>Upload...</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Meetscreen;
