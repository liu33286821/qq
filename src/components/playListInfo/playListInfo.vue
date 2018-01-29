<template>
    <div class="play-list-info" ref="cdList"   v-if="cdList">
      <div class="play-list-top" ref="Top">
        <i class="icon iconfont icon-xiangzuo" @click="goBack"></i>
        <p v-if="!showTitle">歌单</p>
        <div v-if="showTitle" class="show-title">
          <p>{{cdList.dissname}}</p>
        </div>
        <i class="icon iconfont icon-listmore r"></i>
      </div>
      <music-common-title v-if="showCommonTitle"
                          :TopTitle="fixed"
                          :class="{'show-common-title':showCommonTitle}"
                          :lists="cdList.songlist"></music-common-title>
      <div class="scroll-parent">
        <scroll ref="scroll" class="scroll"
                @scroll="scroll"
                :probeType="probeType"
                :listenScroll="listenScroll"
        >
          <div class="scroll-div">
            <div class="music-title clearfix" ref="musicTitle" :style="{'opacity': opacity}">
              <div class="music-title-bg" ref="musicTitleBg" :style="{backgroundImage:`url(${cdList.logo})`}"></div>
              <div class="music-title-con clearfix" ref="musciTitleCon">
                <div class="music-title-l">
                  <music-common-image :Image="cdList.logo" ref="musicTitleImage" :PlayBack="PlayBack" :PlayNum="PlayNum"></music-common-image>
                  <!--<img :src="cdList.logo" ref="musicTitleImage"  width="100%" height="100%"/>-->
                  <!--<div class="music-title-l-bottom">-->
                    <!--<p><i class="icon iconfont icon-toudaierji"></i><span>{{PlayNum}}</span></p>-->
                  <!--</div>-->
                </div>
                <div class="music-title-r">
                  <h2>{{cdList.dissname}}</h2>
                  <p>简介：<Span v-html="cdList.desc"></Span></p>
                </div>
              </div>
              <favorite></favorite>
            </div>
            <music-list :lists="cdList.songlist" :bottom="bottom"></music-list>
          </div>
        </scroll>
      </div>
      <error-info :Info="errorInfo" v-show="errorInfo.status"></error-info>
    </div>
</template>

<script>
import {getPlayListInfo} from '@/api/api'
import Scroll from '@/base/scroll/scroll.vue'
import Favorite from '@/base/favorite/favorite'
import errorInfo from '@/base/error-info/error-info'
import MusicList from '@/base/music-list/music-list'
import MusicCommonTitle from '@/base/music-common-title/music-common-title'
import MusicCommonImage from '@/base/music-common-image/music-common-image'
import {mapGetters} from 'vuex'
import {SingerNameSort} from '@/api/common'
const PaddingHeight = 130
const OPACITY = 1
export default {
  components: {Scroll, Favorite, errorInfo, MusicList, MusicCommonTitle, MusicCommonImage},
  data () {
    return {
      cdList: null,
      showTitle: false,
      scrollY: 0,
      opacity: 1,
      showCommonTitle: false,
      bottom: 0,
      PlayBack: true
    }
  },
  computed: {
    PlayNum () {
      let num = this.cdList.visitnum + ''
      if (num.length > 4) {
        let num2 = num.substr(0, num.length - 4)
        return num2 + '万'
      } else {
        return num
      }
    },
    ...mapGetters(['errorInfo'])
  },
  created () {
    let id = this.$route.params.id
    this.probeType = 3
    this.listenScroll = true
    this.getData(id)
  },
  updated () {
    let _this = this
    window.addEventListener('resize', function () {
      _this.getBgHeight()
    })
  },
  methods: {
    getData (id) { //从api中获取到数据。
      getPlayListInfo(id).then((res) => {
        this.cdList = res.cdlist[0]
        var _this = this
        var lists = res.cdlist[0].songlist
        lists.forEach(function (item, index) {
          _this.cdList.songlist[index].singer = SingerNameSort(item.singer)
        })
        //console.log(this.cdList.songlist)
      })
    },
    getBgHeight () {  //屏幕测试拉伸的话  页面大小会不一致。 所以需要根据屏幕的宽度来进行改变
      let ImgHeight = this.$refs.musicTitleImage.clientHeight
      this.$refs.musicTitleBg.style.width = `100%`
      this.$refs.musicTitleBg.style.height = `${ImgHeight + PaddingHeight}px`
    },
    goBack () { //返回上一页
      this.$router.go(-1)
    },
    scroll (pos) {
      this.scrollY = pos.y
    }
  },
  watch: {
    scrollY (newValue, oldValue) {
      let height = this.$refs.musicTitle.clientHeight
      let opacity = Math.abs(newValue / height)
      let opc
      if (newValue < oldValue) {
        opc = Math.max(0, OPACITY - opacity)
        this.fixed = true
        this.$refs.Top.style.backgroundImage = `url(${this.cdList.logo})`
        this.$refs.Top.style.opacity = `${1 - opc}`
      } else {
        opc = OPACITY - opacity
        this.$refs.Top.style.backgroundImage = `url(${this.cdList.logo})`
        this.$refs.Top.style.color = '#fff'
      }
      if (newValue >= 0) {
        this.showTitle = false
        this.$refs.Top.style.backgroundColor = `rgba(255,255,255,${Math.min(0.3, OPACITY - opacity)})`
        this.$refs.Top.style.color = '#fff'
        this.$refs.Top.style.backgroundImage = 'none'
        this.$refs.Top.style.opacity = `${Math.min(1, Math.max(1, -(OPACITY - opacity)))}`
      }
      if (-newValue >= height - 40) {
        this.showCommonTitle = true
        this.showTitle = true
        this.$refs.Top.style.opacity = `${Math.max(1, 0 + opc)}`
      } else {
        this.showCommonTitle = false
        this.showTitle = false
        this.$refs.Top.style.opacity = `${0 + opc}`
      }
      this.opacity = opc
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
    padding-bottom: 60px;
  }
  .play-list-top{
    height: 40px;
    line-height: 40px;
    text-align: center;
    position: relative;
    z-index: 100;
    background: rgba(255,255,255,.3);
    text-align: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .play-list-top .show-title{
    width: 65%;
    overflow: hidden;
    display: inline-block;
  }
  .play-list-top .show-title p{
    display: inline-block;
    white-space: nowrap;
  }
  .show-title p{
    -webkit-animation: 10s text linear infinite normal;
    animation: 10s text linear infinite normal;
  }
  @keyframes text {
    0% {
      -webkit-transform: translate3d(50%, 0, 0);
      transform: translate3d(50%, 0, 0);
    }
    100% {
      -webkit-transform: translate3d(-100%, 0px, 0);
      transform: translate3d(-100%, 0px, 0);
    }
  }
  .play-list-top i{
    position: absolute;
    width: 40px;
    height: 40px;
    top: 0;
    color: #fff;
    font-size: 24px;
  }
  .icon-xiangzuo{left: 15px}
  .icon-listmore{right: 15px;}
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
    width: 100%;
    height: 110%;
  }
  .music-title{
    position: relative;
    padding-top: 40px;
    transition: all .3s;
  }
  .music-title-con{
    position: relative;
    z-index: 10;
    padding:15px 35px;
  }
  .music-title-l{
    width: 40%;
    height: auto;
    float: left;
    position: relative;
  }
  .music-title-l img{width: 100%;height: 100%}
  .music-title-r{
    text-align: left;
    margin-left: 43%;
    font-size: 12px;
  }
  .music-title-r h2{
    font-size: 16px;
    line-height: 24px;
    margin: 5% 0;
    font-weight: 100;
  }
  .music-title-r p{
    width:100%;
    word-break:break-all;
    display:-webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient:vertical;
    overflow:hidden;
    line-height: 20px;
  }
  .music-title-l-bottom span{
    vertical-align: middle;
    font-size: 14px;
  }
  .scroll{
    height: 100%;
    overflow: hidden;
  }
  .scroll-parent{
    position: relative;
    top: -40px;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
