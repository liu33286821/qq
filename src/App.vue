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

<style type="text/css">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
  .index-enter-active,
  .index-leave-active {
    transition: all .5s;
    position: relative;
  }
  .index-leave-to{
    transform: translate3d(-100%, 0, 0);
  }
</style>
