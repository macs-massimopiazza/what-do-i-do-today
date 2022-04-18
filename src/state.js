import Vue from "vue";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged   } from "firebase/auth";

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
    }
)

//Game Logic


//Alert Manager
export const throwAlert = function(alertText, alertType){
    state.alertMessage = alertText;
    state.alertClass = "show " + alertType;
    setTimeout(() => {
        state.alertClass = "hidden";
        state.alertMessage = '--';
    }, 4000)
  }

//Login Logic Functions
export const registerNewUser = (email, password) =>
  new Promise((resolve, reject) => {
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

export const checkSignInStatus = function(){
    onAuthStateChanged(auth, (user) => {
        if (user) {
          state.signedIn.status = true;
          state.signedIn.sessionUser = user;
        } else {
          state.signedIn.status = false;
          state.signedIn.sessionUser = {};
        }
      });
}



