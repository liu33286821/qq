<template>
    <div>
      <img :src="newImage" v-if="newImage" class="edge_mark"/>
      <img :src="Image" class="list-cover"/>
      <div class="music-title-l-bottom" v-if="PlayBack">
        <p><i class="icon iconfont icon-toudaierji"></i><span>{{PlayNum}}</span></p>
      </div>
    </div>
</template>

<script>
  export default {
    props: {
      Image: {
        type: String,
        default: ''
      },
      newImage: {
        type: String,
        default: ''
      },
      PlayBack: {
        type: Boolean,
        default: false
      },
      PlayNum: {
        type: String,
        default: ''
      }
    }
  }
</script>
<style scoped>
  .list-cover {
    width: 100%;
    height: auto;
  }
  .edge_mark{
    position: absolute;
    left: 0;
    top: 0;
  }
  .music-title-l-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40px;
    text-align: left;
    line-height: 40px;
    padding-left: 10px;
  }
  .icon-toudaierji{
    margin-right: 4px;
    vertical-align: middle;
    font-size: 15px;
  }
</style>
