<template>
  <div id="app">
    <m-header></m-header>
    <router-view/>
    <play></play>
  </div>
</template>

<script>
import MHeader from '@/components/header/header'
import Play from '@/components/play/play'
export default {
  name: 'App',
  components: {MHeader, Play}
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
