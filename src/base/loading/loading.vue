<template>
  <div class="loading" v-show="loadingShow"><img src="/static/images/loading.gif"/></div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters(['loadingShow'])
  }
}
</script>
<style scoped>
  .loading{
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
</style>
