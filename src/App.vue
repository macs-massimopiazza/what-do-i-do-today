<template>
  <div id="app">
    <div class="activities-wrapper">
      <ActivityCard v-for="(activity, index) in activities" :key="index" :activityInfo="activity"/>
    </div>
  </div>
</template>

<script>
import ActivityCard from './components/ActivityCard.vue'
// import axios from 'axios'

export default {
  name: 'App',
  components: {
    ActivityCard
  },
  data(){
    return {
      activities: [],
    }
  },
  methods: {
    // TODO https://www.boredapi.com/
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
