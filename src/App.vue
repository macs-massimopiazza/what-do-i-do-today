<template>
  <div id="app">
    <div class="auth" v-if="!isSignedIn">
      <h3>Hai già un account?</h3>
      Email: <input type="text" v-model="emailLogin">
      <br/>
      Password: <input type="password" v-model="pswLogin">
      <button @click="loginUser">Login</button>

      <h3>Crea un account:</h3>
      Email: <input type="text" v-model="emailRegister">
      <br/>
      Password: <input type="password" v-model="pswRegister">
      <button @click="registerNewUser">Register</button>
    </div>
    <div class="game-home" v-else>
      Homepage Gioco
      <button class="signOut">signout</button>
    </div>

    <!-- when user not logged 
    show what do i do today logo, 
    mini descrizione e form (con bottoni thirdparty login) per login
    + bottone registrati-->
    <!-- when user logged 
    show activities
    -->
  </div>
</template>

<script>
// import NotLoggedView from './components/NotLoggedView.vue'
// import GameHome from './components/GameHome.vue'
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
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
const auth = getAuth();
// const analytics = getAnalytics(app);
console.log(app);

export default {
  name: 'App',
  components: {
    // NotLoggedView,
    // GameHome
  },
  data(){
    return {
      isSignedIn: false,
      emailRegister: '',
      pswRegister: '',
      emailLogin: '',
      pswLogin: '',
    }
  },
  methods: {
    // TODO https://www.boredapi.com/
    registerNewUser: function() {
      if(this.emailRegister != '' && this.pswRegister != '') {
        console.log("pronto a registrare");
        createUserWithEmailAndPassword(auth, this.emailRegister, this.pswRegister)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
          });
        this.email = this.psw = ''
      } else {
        console.log("cazo fai inserisci email e psw");
      }
    },
    loginUser: function(){
      signInWithEmailAndPassword(auth, this.emailLogin, this.passwordLogin)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage)
        });
    },
    signOut: function(){
      auth.signOut().then(()=>{this.checkIfSignedIn();})
    },
    checkIfSignedIn: function(){
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const uid = user.uid;
            console.log(uid);
            this.isSignedIn = true;
          } else {
            this.isSignedIn = false;
          }
      });
    }
  },
  created(){
    this.checkIfSignedIn();
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100vw;
  height: 100vh;
}

.activities-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>
