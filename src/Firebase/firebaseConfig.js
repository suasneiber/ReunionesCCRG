import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCGBCtNuTXRbsQpLRYGxZRsvUW_hu6odF4",
    authDomain: "cciadmin-cbdfb.firebaseapp.com",
    databaseURL: "https://cciadmin-cbdfb.firebaseio.com",
    projectId: "cciadmin-cbdfb",
    storageBucket: "cciadmin-cbdfb.appspot.com",
    messagingSenderId: "587876963260",
    appId: "1:587876963260:web:1f02407c052f2216e891b9"
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const getFirebase= () => {
    return app
}

export const getFirestore = () => {
    return firebase.firestore(app)
}

export const getAuth = ()=> {
    return firebase.auth()
}