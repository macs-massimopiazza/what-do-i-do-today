import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0eHlAwojYv6sDdMqapqmgZTBMQFELrHc",
  authDomain: "what-do-i-do-today-5ab1e.firebaseapp.com",
  projectId: "what-do-i-do-today-5ab1e",
  storageBucket: "what-do-i-do-today-5ab1e.appspot.com",
  messagingSenderId: "330876849393",
  appId: "1:330876849393:web:950b0774ca90af44b5ed50",
  measurementId: "G-0MJSQJSKNL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
console.log(app);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
