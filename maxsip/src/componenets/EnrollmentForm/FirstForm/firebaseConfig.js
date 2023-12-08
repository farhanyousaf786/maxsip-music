import firebase from 'firebase';
 
const firebaseConfig = {
  apiKey: "AIzaSyD7iDF2KKOCEvt8QmuBQ2e_SIlskDlzb68",
  authDomain: "maxsip-unavo-form.firebaseapp.com",
  projectId: "maxsip-unavo-form",
  storageBucket: "maxsip-unavo-form.appspot.com",
  messagingSenderId: "1083369576740",
  appId: "1:1083369576740:web:5f138513f74a9f94e9bbb1",
  measurementId: "G-MYSCBZYK60"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();
// var storage = firebase.storage();


export default database ;