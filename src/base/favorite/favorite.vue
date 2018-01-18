<template>
    <div class="favorite">
      <ul>
        <li><i class="icon iconfont icon-favorite-outline"></i></li>
        <li><router-link to=""><i class="icon iconfont icon-comment"></i></router-link></li>
        <li><router-link to=""><i class="icon iconfont icon-share"></i></router-link></li>
      </ul>
    </div>
</template>

<script>
  export default {
    name: '',
    data () {
      return {}
    }
  }
</script>
<style scoped>
  .favorite {
    width: 100%;
    height: 40px;
    position: relative;
    z-index: 5;
  }
  .favorite ul{
    display: flex;
  }
  .favorite li{
    flex: 1;
  }
</style>
