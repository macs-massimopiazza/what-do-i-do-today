<template>
  <div class="game-home">
    Apposto sei loggato
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import { logoutUser } from "../state.js"

export default {
  name: 'GameHome',
  methods: {
    logout: function(){
      logoutUser();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
