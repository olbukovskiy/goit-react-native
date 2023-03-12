import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";

import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getAuth } from "firebase/auth";
import "firebase/auth";
import { IPost } from "../services/types";

const firebaseConfig = {
  apiKey: "AIzaSyAV_4kEramuqb6jKfgbwbITaIFLuQtdNNs",
  authDomain: "goit-react-hw.firebaseapp.com",
  projectId: "goit-react-hw",
  storageBucket: "goit-react-hw.appspot.com",
  messagingSenderId: "182427175842",
  appId: "1:182427175842:web:03294884fd0f734ee280fb",
  measurementId: "G-WRJTGFRST4",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const uploadPicture = async (
  picturePath: string,
  type: "profile" | "post"
) => {
  try {
    const response = await fetch(picturePath.toString());
    const pictureFile = await response.blob();

    const uniqueId = Date.now().toString();

    let imageRef;

    if (type === "profile") {
      imageRef = ref(storage, `profilePictures/${uniqueId}`);
    }

    if (type === "post") {
      imageRef = ref(storage, `postsPictures/${uniqueId}`);
    }

    if (imageRef !== undefined) {
      await uploadBytes(imageRef, pictureFile);
      const pictureUrl = await getDownloadURL(imageRef);

      return pictureUrl;
    }

    return "https://via.placeholder.com/200x300.svg/000000/ffffff?text=Sorry+,+image+loading+is+failed";
  } catch (error) {
    const newError = error as { message: string };
    console.log(newError.message);
  }
};

export const uploadData = async (post: IPost) => {
  try {
    const postsCollection = collection(db, "posts");
    const postRef = await addDoc(postsCollection, post);

    return postRef.id;
  } catch (error) {
    const newError = error as { message: string };
    console.log(newError.message);
  }
};
