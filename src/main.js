import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'

import { initializeApp } from "firebase/app";
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
console.log(app)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
