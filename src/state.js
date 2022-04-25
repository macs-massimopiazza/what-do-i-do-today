import Vue from "vue";
//Inizialize Firebase App
import { initializeApp } from "firebase/app";
//import realtime db modules
import { getDatabase, ref, set } from "firebase/database";
//use axios to get activities
import axios from "axios";

//Import firebase auth modules
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  updateProfile,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

//firebase app config
const firebaseConfig = {
  apiKey: "AIzaSyA0eHlAwojYv6sDdMqapqmgZTBMQFELrHc",
  authDomain: "what-do-i-do-today-5ab1e.firebaseapp.com",
  databaseURL: "https://what-do-i-do-today-5ab1e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "what-do-i-do-today-5ab1e",
  storageBucket: "what-do-i-do-today-5ab1e.appspot.com",
  messagingSenderId: "330876849393",
  appId: "1:330876849393:web:950b0774ca90af44b5ed50",
  measurementId: "G-0MJSQJSKNL"
};
//inizialize reference to firebase app
const app = initializeApp(firebaseConfig);
//initialize reference to auth service
const auth = getAuth(app);
//initialize reference to auth service
const db = getDatabase(app);

//provider for OAuth
let provider;

//Vue Observable properties
export const state = Vue.observable(
    {
        signedIn: {
            status: false,
            sessionUser: {},
        },
        alertClass: "hidden", //hidden or show
        alertMessage: '--',
        loadingClass: "hidden", //hidden or show
        showSettings: false,
    }
)

//Game Logic
export const getCurrentSignedInUserData = function(){
  return auth.currentUser;
}

export const getActivities = (n) =>
  new Promise((resolve, reject) => {
    let activities = [];
    for(let i = 0; i < n; i++) {
      axios.get("https://www.boredapi.com/api/activity/")
        .then(res => {
          activities.push(res.data);
          if (activities.length == n) {
            resolve(activities)
          }
        })
        .catch(err => {
          console.log(err);
          reject("errore axios: " + err)
        })
    }
  });

//Alert Manager
export const throwAlert = function(alertText, alertType){
    state.alertMessage = alertText;
    state.alertClass = "show " + alertType;
    setTimeout(() => {
        state.alertClass = "hidden";
        state.alertMessage = '--';
    }, 4000)
  }

//Settings
export const toggleSettings = function() {
  state.showSettings = !state.showSettings
}

//User Manipulation Functions
export const updateUser = (changedObj) =>
  new Promise((resolve, reject) => {
    updateProfile(auth.currentUser, changedObj)
    .then(() => {
        resolve("ok")
    })
    .catch((error) => {
        reject(error.code + " => " + error.message)
    });
  });

export const throwSendEmailVerification  = () =>
  new Promise((resolve, reject) => {
    sendEmailVerification (auth.currentUser)
    .then(() => {
        resolve("ok")
    })
    .catch((error) => {
        reject(error.code + " => " + error.message)
    });
  });

//Login Logic Functions
export const registerNewUser = (email, password) =>
  new Promise((resolve, reject) => {
    email = email.trim();
    password = password.trim();
    createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
        resolve("ok")
    })
    .catch((error) => {
        reject(error.code + " => " + error.message)
    });
  });

export const loginUser = (email, password) =>
  new Promise((resolve, reject) => {
    email = email.trim();
    password = password.trim();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        console.log(userCredential)
        resolve("ok")
        checkSignInStatus()
    })
    .catch((error) => {
        reject(error.code + " => " + error.message)
    });
  });

export const logoutUser = function() {
    auth.signOut()
    .then(() => {
        checkSignInStatus()
    })
}

export const googleOAuth = () => 
  new Promise((resolve, reject) => {
    provider = new GoogleAuthProvider();
    state.loadingClass="show";
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // googleApiToken = credential.accessToken
        console.log(result)
        resolve("ok")
        checkSignInStatus()
        state.loadingClass="hidden";
      }).catch((error) => {
        // The email of the user's account used.
        console.log(error.email);
        // The AuthCredential type that was used.
        console.log(GoogleAuthProvider.credentialFromError(error));
        reject(error.code + " => " + error.message)
        state.loadingClass="hidden";
      });
  });

export const checkSignInStatus = function(){
    state.loadingClass="show";
    onAuthStateChanged(auth, (user) => {
        if (user) {
          state.signedIn.status = true;
          state.signedIn.sessionUser = user;
          state.loadingClass="hidden";
        } else {
          state.signedIn.status = false;
          state.signedIn.sessionUser = {};
          state.loadingClass="hidden";
        }
      });
}

//realtime database
export const writeUserData = function(activities) {
  set(ref(db, 'users/' + auth.currentUser.uid), {
    activities
  })
}


