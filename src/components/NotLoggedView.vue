<template>
  <div class="login">
    <button @click="$emit(logWithGoogle)">Sign in with Google</button>
  </div>
</template>

<script>
export default {
  name: 'NotLoggedView'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
