<template lang="html">
  <div id="admin">
    <navigation></navigation>
    <sidebar></sidebar>
    <div id="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import navigation from './layout/header.vue'
import sidebar from './layout/aside.vue'

export default {
  components : {
    navigation,
    sidebar
  }
}
</script>
<style lang="sass">
  #main
    margin: 90px 0 0 110px
</style>
