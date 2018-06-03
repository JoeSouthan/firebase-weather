import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/database';

const app = firebase.initializeApp({
  apiKey: "AIzaSyBV7siy0bl54B65C9H9tZnKa-myESukw68",
  authDomain: "iot-project-204111.firebaseapp.com",
  databaseURL: "https://iot-project-204111.firebaseio.com",
  projectId: "iot-project-204111",
  storageBucket: "iot-project-204111.appspot.com",
  messagingSenderId: "60641464229"
});

const db = firebase.database(app);
const base = Rebase.createClass(db);

export default base;
