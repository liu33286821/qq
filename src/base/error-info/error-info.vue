<template>
    <div class="error-info">
      <p>{{Info.text}}</p>
    </div>
</template>

<script>
  export default {
    props: {
      Info: {
        type: Object,
        default: null
      }
    }
  }
</script>
<style scoped>
  .error-info {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    z-index: 1000;
  }
  .error-info p{
    width: 200px;
    height: 50px;
    background: #fff;
    color: #333;
    line-height: 50px;
    border-radius: 15px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -100px;
    margin-top: -25px;
  }
</style>
