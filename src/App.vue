<template>
  <div id="app">
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
import { state } from "./state.js"

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
      return state.signedIn;
    }
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

::placeholder {
  color: rgb(232, 232, 232);
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

.activities-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>
