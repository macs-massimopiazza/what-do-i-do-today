<template>
  <div class="game-home">
    <!-- <pre> {{ getUserInfo }} </pre> -->
    <button class="btn-primary" @click="logout">Logout</button>
  </div>
</template>

<script>
import { logoutUser, getCurrentSignedInUserData } from "../state.js"

export default {
  name: 'GameHome',
  methods: {
    logout: function(){
      logoutUser();
    }
  },
  computed: {
    getUserInfo() {
      return getCurrentSignedInUserData();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
button {
      min-height: 3rem;

      &.btn-primary {
        border: none;
        color: #fff;
        background-color: #4c3211;

        border-radius: 5px;
        font-size: 0.9rem;
        font-weight: 700;
      }

      &:hover {
        cursor: pointer;
      }
    }
</style>
