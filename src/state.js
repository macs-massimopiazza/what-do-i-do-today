import Vue from "vue";
import { initializeApp } from "firebase/app";
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

const firebaseConfig = {
  apiKey: "AIzaSyA0eHlAwojYv6sDdMqapqmgZTBMQFELrHc",
  authDomain: "what-do-i-do-today-5ab1e.firebaseapp.com",
  projectId: "what-do-i-do-today-5ab1e",
  storageBucket: "what-do-i-do-today-5ab1e.appspot.com",
  messagingSenderId: "330876849393",
  appId: "1:330876849393:web:950b0774ca90af44b5ed50",
  measurementId: "G-0MJSQJSKNL"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
let provider;

//Data
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
    .then((userCredential) => {
        console.log(userCredential)
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



