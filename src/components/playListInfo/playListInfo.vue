<template>
    <div class="play-list-info" v-if="cdList">
      <div class="play-list-top">
        <i class="icon iconfont icon-xiangzuo"></i>
        <p>歌单</p>
        <p v-if="ShowTitle">{{cdList.dissname}}</p>
      </div>
      <scroll ref="scroll" class="scroll">
        <div class="scroll-div">
          <div class="music-title">
            <div class="music-title-bg" ref="musicTitleBg" :style="{backgroundImage:`url(${cdList.logo})`}"></div>
            <div class="music-title-con">
              <img :src="cdList.logo"/>
              <div class="music-title-r">
                <h2>{{cdList.dissname}}</h2>
                <p>简介：{{cdList.desc}}</p>
              </div>
            </div>
            <favorite></favorite>
          </div>
          <div class="music-list"></div>
        </div>
      </scroll>
    </div>
</template>

<script>
import {getPlayListInfo} from '@/api/api'
import Scroll from '@/base/scroll/scroll.vue'
import Favorite from '@/base/favorite/favorite'
const Height = 40
export default {
  components: {Scroll, Favorite},
  name: '',
  data () {
    return {
      cdList: null,
      ShowTitle: false
    }
  },
  created () {
    let id = this.$route.params.id
    if (id) {
      this.getData(id)
    }
  },
  updated () {
    this.getBgHeight()
  },
  methods: {
    getData (id) {
      getPlayListInfo(id).then((res) => {
        this.cdList = res.cdlist[0]
        console.log(this.cdList)
      })
    },
    getBgHeight () {
      let width = this.$refs.musicTitleBg.parentNode.clientWidth
      let height = this.$refs.musicTitleBg.parentNode.clientHeight
      height += Height
      this.$refs.musicTitleBg.style.width = `${width}px`
      this.$refs.musicTitleBg.style.height = `${height}px`
    }
  }
}
</script>
<style scoped>
  .play-list-info{
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background:#ccc;
    color: #fff;
  }
  .play-list-top{
    height: 40px;
    line-height: 40px;
    text-align: center;
    position: relative;
    z-index: 100;
    background: rgba(255,255,255,0.1);
  }
  .play-list-top i{
    position: absolute;
    width: 40px;
    height: 40px;
    left: 15px;
    top: 0;
    color: #fff;
    font-size: 20px;
  }
  .music-title-bg{
    background-size: 150% 150%;
    background-size: cover;
    -webkit-filter: blur(15px);
    -moz-filter: blur(15px);
    -o-filter: blur(15px);
    -ms-filter: blur(15px);
    filter: blur(15px);
    position: absolute;
    top: -40px;
    left: 0;
  }
  .music-title{
    position: relative;
  }
  .music-title-con{
    position: relative;
    z-index: 10;
    padding:25px 35px;
  }
  .music-title-con img{
    width: 40%;
    height: auto;
    float: left;
  }
  .music-title-r{
    text-align: left;
    margin-left: 43%;
    font-size: 12px;
  }
  .music-title-r h2{
    font-size: 16px;
    line-height: 24px;
    margin: 20px 0;
    font-weight: 100;
  }
  .music-title-r p{
    width:100%;
    word-break:break-all;
    display:-webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient:vertical;
    overflow:hidden;
    line-height: 24px;
  }
</style>
