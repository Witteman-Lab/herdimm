import firebase from "firebase/app";
import 'firebase/firestore'

let firebaseConfig = {
    apiKey: "AIzaSyBd--LxbfoCdonhrGYUEv2WkvV2RBgewF4",
    authDomain: "herdimm-7d6c9.firebaseapp.com",
    databaseURL: "https://herdimm-7d6c9.firebaseio.com",
    projectId: "herdimm-7d6c9",
    storageBucket: "herdimm-7d6c9.appspot.com",
    messagingSenderId: "548934183538",
    appId: "1:548934183538:web:de2f44167b154c774670eb",
    measurementId: "G-Y5E1JLXSJ7"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
// db.settings({timestampsInSnapshots : true});


export default db;
