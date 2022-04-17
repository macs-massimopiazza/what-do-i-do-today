<template>
  <div class="game-home">
    <pre> {{ getUserInfo }} </pre>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import { logoutUser, state } from "../state.js"

export default {
  name: 'GameHome',
  methods: {
    logout: function(){
      logoutUser();
    }
  },
  computed: {
    getUserInfo() {
      return state.signedIn.sessionUser
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
