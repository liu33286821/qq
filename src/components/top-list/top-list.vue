<template>
  <div id="top-list">
    <div class="top-common-back">
      <div @click="goBack"><i class="icon iconfont icon-xiangzuo"></i></div>
      <div><p>排行</p></div>
    </div>
    <scroll class="top-list-scroll"
            @scroll="scroll"
            :probeType="probeType"
            :listenScroll="listenScroll"
            ref="topListScroll">
      <div class="top-list-content" ref="TopListContent">
        <p>QQ音乐巅峰榜</p>
        <ul>
          <li class="clearfix" v-for="item in List" :data-id="item.id">
            <router-link :to="'/toplist/'+item.id">
              <div class="top-list-image"><img :src="item.picUrl"/></div>
              <div class="top-list-music">
                <p v-for="music in item.songList">{{music.singername}}-{{music.songname}}</p>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </scroll>
    <loading></loading>
    <router-view></router-view>
  </div>
</template>

<script type="es6">
import {getTopList} from '@/api/api'
import MusicCommonImage from '@/base/music-common-image/music-common-image'
import Scroll from '@/base/scroll/scroll.vue'
import Loading from '@/base/loading/loading'
import {mapMutations} from 'vuex'
const Height = 100
export default {
  data () {
    return {
      List: [],
      scrollY: 0
    }
  },
  components: {Scroll, MusicCommonImage, Loading},
  created () {
    this.getData()
    this.probeType = 3
    this.listenScroll = true
  },
  mounted () {
    this.clientHeight()
  },
  methods: {
    ...mapMutations(['LOADING_SHOW']),
    getData () {
      this.LOADING_SHOW(true)
      getTopList().then((res) => {
        if (res.code === 0) {
          //console.log(res.data)
          this.List = res.data.topList
          this.$nextTick(() => {
            this.LOADING_SHOW(false)
          })
        }
      })
    },
    goBack () {
      this.$router.go(-1)
    },
    scroll (newY) {
      this.scrollY = newY
    },
    clientHeight () { //这个函数在其created调用的时候。 获取不到$refs 只能在mounted中调用获取$refs
      this.$refs.TopListContent.style.paddingBottom = `${Height}px`
    }
  }
}
</script>
<style scoped>
  #top-list {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
  }
  .top-common-back{
    height: 40px;
    background: #31c27c;
    top: 0;
    left: 0;
    position: relative;
    z-index: 2;
  }
  .top-common-back div{
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: #fff;
    text-align: center;
  }
  .top-common-back div:first-child .icon{
    font-size: 24px;
    color: #fff;
    line-height: 40px;
  }
  .top-common-back div:first-child{
    left: 15px;
    width: 40px;
    z-index: 10;
    text-align: left;
  }
  .top-list-content li {margin-bottom: 15px;text-align: left}
  .top-list-scroll{width: 100%;height: 100%;position: relative;z-index: 1}
  .top-list-content{padding: 0 15px}
  .top-list-content>p {text-align: center;letter-spacing: 5px;height: 40px;line-height: 40px;}
  .top-list-image{width:100px;height: 100px;float: left}
  .top-list-image img{width: 100%;height: 100%}
  .top-list-music{margin: 5px 0 0 110px;line-height: 30px}
  .top-list-music p{
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
    white-space:nowrap;
  }
</style>
