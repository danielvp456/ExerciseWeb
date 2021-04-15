import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBs7NXxfrRbOggQmIf23Yjhx8d_mJQsgcM",
    authDomain: "dw-ej-01.firebaseapp.com",
    projectId: "dw-ej-01",
    storageBucket: "dw-ej-01.appspot.com",
    messagingSenderId: "842775403877",
    appId: "1:842775403877:web:67638aad38e37341fb558c"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
export var storage = firebase.storage();
export const db = fb.firestore();
