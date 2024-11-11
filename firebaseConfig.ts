// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
	getAuth,
	initializeAuth,
	getReactNativePersistence,
	inMemoryPersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDD2vfiUnvovixbbJ4UN72_pbGm1QxdgLI",
	authDomain: "flyspy-team.firebaseapp.com",
	projectId: "flyspy-team",
	storageBucket: "flyspy-team.appspot.com",
	messagingSenderId: "1006732287621",
	appId: "1:1006732287621:web:69d72d727a2e5c6a31d3ec",
	measurementId: "G-PXYTXMP23N",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

// initialize Firebase Auth for that app immediately
const auth = initializeAuth(app, {
	// persistence: getReactNativePersistence(ReactNativeAsyncStorage)
	persistence: inMemoryPersistence,
});

const db = getFirestore(app);

export { storage, auth, db };