<template>
  <div id="app">
    <m-header></m-header>
      <router-view/>
  </div>
</template>

<script>
import MHeader from '@/components/header/header'
export default {
  name: 'App',
  components: {MHeader}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
