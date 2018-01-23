<template>
  <div id="app">
    <m-header></m-header>
    <router-view/>
    <player></player>
  </div>
</template>

<script>
import MHeader from '@/components/header/header'
import Player from '@/components/player/player'
export default {
  name: 'App',
  components: {MHeader, Player}
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
