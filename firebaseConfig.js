import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCcWR7GQbXWXml9QXyRUUZ6YyTPtEDW0gA",
  authDomain: "findr-8fd89.firebaseapp.com",
  projectId: "findr-8fd89",
  storageBucket: "findr-8fd89.appspot.com",
  messagingSenderId: "196611832380",
  appId: "1:196611832380:web:636939caa5f82198db6139",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
const storage = getStorage();
export { auth, db, storage };
