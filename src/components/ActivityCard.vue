<template>
  <div class="activity-card">
    <h3>{{ activityInfo.activity }}</h3>
    <p>{{ activityInfo.participants }}</p>
    <p>{{ activityInfo.price }}</p>
  </div>
</template>

<script>
export default {
  name: 'ActivityCard',
  props: {
    activityInfo: Object
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.activity-card {
  width: calc((100% / 3) - 20px);
}
</style>
