import firebase from "firebase";
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBpPsUFXaQu2ZqPQqQGtY1jVliZfjXs6VI",
    authDomain: "olx-react-app-53071.firebaseapp.com",
    projectId: "olx-react-app-53071",
    storageBucket: "olx-react-app-53071.appspot.com",
    messagingSenderId: "183183595924",
    appId: "1:183183595924:web:0ee3b1855c56cb0c46d781",
    measurementId: "G-80MTX30BZ2"
  };

  export default firebase.initializeApp(firebaseConfig)