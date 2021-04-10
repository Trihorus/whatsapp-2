import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyClyWDChu_5EnkYWpQ_XSX-Sc5mucT1CbE",
    authDomain: "whatsapp-2-fd684.firebaseapp.com",
    projectId: "whatsapp-2-fd684",
    storageBucket: "whatsapp-2-fd684.appspot.com",
    messagingSenderId: "854675766860",
    appId: "1:854675766860:web:931cf8744256ab2a847ee9",
    measurementId: "G-NM1ZTPSJXD"
  };

const app = !firebase.apps.length? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };