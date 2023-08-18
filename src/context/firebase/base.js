import * as firebase from 'firebase/app'
import 'firebase/auth'

const app = firebase.initializeApp({
    apiKey: "AIzaSyCtRl1TFEtg200fl_3OfyFZj2MY-Hzp5B4",
    authDomain: "regalo-margarita.firebaseapp.com",
    databaseURL: "https://regalo-margarita.firebaseio.com",
    projectId: "regalo-margarita",
    storageBucket: "regalo-margarita.appspot.com",
    messagingSenderId: "999514797935",
    appId: "1:999514797935:web:bd7e14858e422da0805a9a",
    measurementId: "G-S3D6QR4J4Z"
})

export default app 