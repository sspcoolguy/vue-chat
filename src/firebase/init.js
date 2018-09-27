import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyB97p0sDToCQRbfN08YO2-0Nfmfd8IbLfM",
    authDomain: "vue-chat-43e2b.firebaseapp.com",
    databaseURL: "https://vue-chat-43e2b.firebaseio.com",
    projectId: "vue-chat-43e2b",
    storageBucket: "vue-chat-43e2b.appspot.com",
    messagingSenderId: "195369382006"
  };
  const firebaseApp = firebase.initializeApp(config);
  firebaseApp.firestore().settings({ timestampsInSnapshots: true })

  export default firebaseApp.firestore()
