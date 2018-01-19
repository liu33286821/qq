<template>
    <div class="favorite clearfix">
      <ul>
        <li @click="favorite"><i class="icon iconfont icon-favorite-outline"></i></li>
        <li @click="Comment"><i class="icon iconfont icon-comment"></i></li>
        <li @click="Share"><i class="icon iconfont icon-share"></i>分享</li>
      </ul>
    </div>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    props: {
      undeveloped: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      ...mapActions({
        Undeveloped: 'Undeveloped'
      }),
      Share () {
        this.Undeveloped({
          status: true
        })
      },
      Comment () {
        this.Undeveloped({
          status: true
        })
      },
      favorite () {
      }
    }
  }
</script>
<style scoped>
  .favorite {
    width: 100%;
    height: 40px;
    position: relative;
    z-index: 5;
    font-size: 14px;
  }
  .favorite ul{
    display: flex;
  }
  .favorite li{
    flex: 1;
    line-height: 24px;
    font-size: 14px;
  }
  .icon{margin-right: 10px;vertical-align: middle}
  .iconfont{font-size: 24px}
</style>
