import Vue from "vue";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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
        signedIn: false,
    }
)

//Functions
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

// export const registerNewUser = function(email, password){
//     createUserWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             console.log(userCredential)
//             return "ok"
//         })
//         .catch((error) => {
//             console.log(error.code, error.message)
//         });
// }




