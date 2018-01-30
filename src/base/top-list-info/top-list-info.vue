<template>
  <transition name="top-list">
    <div id="top-list-info">
      <div class="top-list-title">
        <div class="top-common-back">
          <div @click="goBack" class="go-back"><i class="icon iconfont icon-xiangzuo"></i></div>
          <div v-if="Show" class="top-list-name"></div>
        </div>
      </div>
      <div>
        {{Info.date}}
      </div>
    </div>
  </transition>

</template>

<script>
import {getTopListInfo} from '@/api/api'
export default {
  name: '',
  data () {
    return {
      Show: true,
      Info: {},
      List: []
    }
  },
  created () {

  },
  mounted () {
    this.getInfo(this.$route.params.id)
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    getInfo (id) {
      getTopListInfo(id).then((res) => {
        this.Info = res.topinfo
        this.List = res.songlist
        this.Info.date = res.date
      })
      console.log(this.Info)
    }
  }
}
</script>
<style scoped>
  .top-list-enter-active,
  .top-list-leave-active{
    transition: all .5s;
  }
  .top-list-enter,
  .top-list-leave-to{
    transform: translate3d(-100%,0,0);
  }
  #top-list-info {
    width: 100%;
    height: 100%;
    background: #fff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
  }
  .top-list-title{
    width: 100%;
    height: 40px;
    text-align: left;
    padding: 0 15px;
    line-height: 40px;
    background: #31c27c;
  }
  .go-back{width: 40px;height: 40px;}
  .icon-xiangzuo{font-size: 20px;color: #fff}
</style>
