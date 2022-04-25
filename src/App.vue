<template>
  <div id="app">
    <div class="alert-box" :class="getAlertClass"> {{getAlertMessage}} </div>
    <div class="loading" :class="getLoadingClass"><img src="./assets/loading.svg"></div>
    <Auth v-if="!getSignedIn" />
    <GameHome v-else />
  </div>
</template>

<script>
import Auth from './components/Auth.vue'
import GameHome from './components/GameHome.vue'
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

// const auth = getAuth();
// const analytics = getAnalytics(app);
import { state, checkSignInStatus } from "./state.js"

export default {
  name: 'App',
  components: {
    Auth,
    GameHome
  },
  methods: {
    
  },
  computed: {
    getSignedIn(){
      return state.signedIn.status;
    },
    getAlertClass(){
      return state.alertClass;
    },
    getAlertMessage(){
      return state.alertMessage;
    },
    getLoadingClass(){
      return state.loadingClass;
    }
  },
  mounted() {
    checkSignInStatus();
  }
}
</script>


<style lang="scss">
@font-face {
    font-family: 'Nighty Demo';
    font-style: normal;
    font-weight: 400;
    src: local('Nighty-Demo'), local('Nighty-Demo'),
        // url("assets/fonts/nightydemo.woff2") format('woff'),
        url("assets/fonts/nightydemo.ttf") format('truetype');
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

::placeholder {
  color: rgb(232, 232, 232);
}

.loading {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(31, 31, 31, 0.4);
  display: grid;
  place-content: center;
  animation: all 250s ease-out;
  z-index: 9998;
  &.hidden {
    visibility: hidden;
  }
  &.show {
    visibility: visible;
  }
}

#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100vw;
  height: 100vh;
  background: #eacda3;  /* fallback for old browsers */
  background: -webkit-linear-gradient(300deg , #d6ae7b, #eacda3);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(300deg, #d6ae7b, #eacda3); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.alert-box {
      color: #fff;
      padding: 1rem;
      border-radius: 5px;
      position: absolute;
      width: 100%;
      max-width: min(70vw, 350px);
      left: 50%;
      transform: translateX(-50%);
      transition: top 300ms ease-out;
      z-index: 9999;
      &.success {
        background: #11998e;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #38ef7d, #11998e);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #38ef7d, #11998e); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      }
      &.error {
        background: #FF416C;
        background: -webkit-linear-gradient(to right, #FF4B2B, #FF416C);
        background: linear-gradient(to right, #FF4B2B, #FF416C);
      }
      &.hidden {
        top: -100px;
      }
      &.show {
        top: 20px;
      }
  }

.activities-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

button {
  min-height: 3rem;

  &.btn-fill {
    border: none;
    color: #fff;
    background-color: #4c3211;

    border-radius: 5px;
    font-size: 0.9rem;
    font-weight: 700;
  }

  &.btn-outline {
    color: #4c3211;
    background-color: #ffeccd;
    border: 2px solid #4c3211;
    border-radius: 5px;
    font-size: 0.9rem;
    font-weight: 700;
  }

  &.btn-fill-light {
    color: #4c3211;
    background-color: #eacda3;
    border: none;
    border-radius: 5px;
    font-size: 0.9rem;
    font-weight: 700;
  }

  &:hover {
    cursor: pointer;
  }
}
</style>
