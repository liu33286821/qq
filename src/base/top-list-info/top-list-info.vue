<template>
  <transition name="top-list">
    <div id="top-list-info" ref="TopListInfo">
      <div class="top-list-title" ref="TopListTitle">
        <div @click="goBack" class="go-back"><i class="icon iconfont icon-xiangzuo"></i></div>
        <div v-if="Show" class="top-list-name">{{Info.ListName}}</div>
      </div>
      <div class="top-list-top" ref="TopListTop" :style="{'background-image': `url(${Info.pic_v12})`}">
        <div class="tlt-content">
          <p>{{Info.ListName}}</p>
          <p>{{Info.date}} 更新</p>
        </div>
      </div>
      <div class="top-list-nav fixed-nav" v-if="NavShow">
        <ul   @click="ShowPage">
          <li :class="{'active':Active === 1}"><span>歌曲</span><i></i></li>
          <li :class="{'active':Active === 0}"><span>详情</span><i></i></li>
        </ul>
      </div>
      <scroll class="top-list-content"
              ref="tlcContent"
              @scroll="scroll"
              :probeType="probeType"
              :listenScroll="listenScroll"
              :pullUpLoad="pullUpLoad"
              @scrollToEnd="scrollToEnd"
      >
        <div>
          <div class="top-list-nav">
            <ul   @click="ShowPage">
              <li :class="{'active':Active === 1}"><span>歌曲</span><i></i></li>
              <li :class="{'active':Active === 0}"><span>详情</span><i></i></li>
            </ul>
          </div>
          <scroll>
            <div v-show="Active == 0" ref="TLCContent" class="tlc-content" v-html="Info.info"></div>
          </scroll>
            <div v-show="Active == 1" class="tlc-music" ref="TLCMusic">
              <music-list :bottom="HEIGHT" :lists="List" :ShowNum="ShowNum" :ShowLoading="ShowLoading"></music-list>
            </div>
        </div>
      </scroll>
      <loading></loading>
    </div>
  </transition>

</template>

<script>
import {getTopListInfo} from '@/api/api'
import {SingerNameSort, percentum} from '@/api/common'
import MusicCommonTitle from '@/base/music-common-title/music-common-title'
import MusicList from '@/base/music-list/music-list'
import Scroll from '@/base/scroll/scroll'
import Loading from '@/base/loading/loading'
import {mapMutations} from 'vuex'
const HEIGHT = 420
const ImageSize = 90 //获取图片的大小不一样。
export default {
  name: '',
  data () {
    return {
      Active: 1,
      Show: false,
      Info: {},
      List: [],
      timer: null,
      scrollY: 0,
      NavShow: false,
      ImageSize: ImageSize,
      ShowNum: 1, //显示排行顺序,
      HEIGHT: HEIGHT,
      ShowLoading: true //滚动加载状态
    }
  },
  components: {MusicCommonTitle, Scroll, Loading, MusicList},
  created () {
    this.listenScroll = true
    this.pullUpLoad = true
    this.probeType = 3
  },
  mounted () {
    this.getInfo(this.$route.params.id)
  },
  methods: {
    ...mapMutations(['LOADING_SHOW']),
    goBack () {
      this.$router.go(-1)
    },
    getInfo (id) {
      if (this.List.length >= 100) {
        this.HEIGHT = 330
        this.LOADING_SHOW(false)
        this.ShowLoading = false
        return
      }
      this.LOADING_SHOW(true)
      getTopListInfo(id).then((res) => {
        this.Info = res.topinfo
        //this.List = res.songlist
        this.LoadingData(res.songlist)
        this.Info.date = res.date
        this.List.forEach(function (item, index) {
          item.singer = SingerNameSort(item.data.singer)
          item.in_count = percentum(item.in_count)
          item.albummid = item.data.albummid
          item.songname = item.data.songname
          item.songid = item.data.songid
          item.interval = item.data.interval
          item.songmid = item.data.songmid
        })
        //console.log(this.List)
        this.LOADING_SHOW(false)
        this.ShowLoading = false
      })
    },
    LoadingData (list) {
      let length = this.List.length
      for (let i = length; i < list.length; i++) {
        if (i < length + 20) {
          if (i >= 100) {
            return
          }
          this.List.push(list[i])
        }
      }
    },
    ShowPage (e) {
      //clearTimeout(this.timer)
      //let children = e.currentTarget.children
      let parentWidth = e.currentTarget.clientWidth
      if (e.pageX > parentWidth / 2) {
        this.Active = 0
      } else {
        this.Active = 1
      }
//      for (var i = 0; i < children.length; i++) {
//        if (children[i].className) {
//          console.log(i)
//          let rotateI = children[i].children[1]
//          rotateI.style.left = `${e.layerX - rotateI.clientWidth / 2}px`
//          rotateI.style.top = `${e.layerY - rotateI.clientHeight / 2}px`
//          rotateI.className = 'show'
//          this.timer = setTimeout(() => {
//            rotateI.className = ''
//          }, 500)
//        }
//      }
    },
    scroll (pos) {
      this.scrollY = pos.y
    },
    scrollToEnd () {
      this.getInfo(this.$route.params.id)
    }
  },
  watch: {
    scrollY (newY) {
      if (newY < 0) {
        this.Show = true
      } else {
        this.Show = false
      }
      let clientHeight = this.$refs.TopListTop.clientHeight
      this.$refs.TLCContent.style.height = `${this.$refs.TopListInfo.clientHeight + clientHeight - 100}px`
      if (clientHeight < Math.abs(newY) + 60) {
        this.NavShow = true
        this.$refs.TopListTitle.style.backgroundImage = `url(${this.Info.pic_v12})`
        this.$refs.TopListTitle.style.backgroundPosition = 'top'
      } else {
        this.NavShow = false
        this.$refs.TopListTitle.style.backgroundImage = 'none'
      }
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
    text-align: center;
    line-height: 40px;
    position: relative;
    z-index: 11;
    display: flex;
    color: #fff;
  }
  .go-back{width: 40px;height: 40px;}
  .top-list-title div:last-child{flex: 0 2 70%;text-align: left;margin: 0 5%}
  .icon-xiangzuo{font-size: 20px;color: #fff}
  .top-list-top{
    padding-top:70%;
    position: relative;
    height: 0;
    width: 100%;
    background-size: 100% 100%;
    margin-top: -60px;
    transition: all .5s;
  }
  .tlt-content{
    position: absolute;
    bottom: 10px;
    left: 0;
    width: 100%;
    text-align: center;
    height: 44px;
    line-height: 24px;
    color: #fff;
  }
  .tlc-content{
    background: #fff;
    line-height: 24px;
    font-size: 12px;
    text-align: left;
    padding: 30px 15px;
  }
  .tlt-content p:last-child{font-size: 12px}
  .top-list-nav{
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #eee;
    background: #fff;
    position: relative;
    z-index: 10;
  }
  .top-list-nav ul{display: flex;}
  .top-list-nav li{flex: 1;    font-size: 14px;position: relative;overflow: hidden}
  .top-list-nav li.active span{
    display: inline-block;
    padding: 0 10px;
    height:40px;
    color: #31c27c;
    border-bottom:2px solid #31c27c;
  }
  .top-list-nav li i {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100px;
    height: 100px;
    background: rgba(0,0,0,0.3);
    border-radius: 50%;
    opacity: 0;
  }
  .top-list-nav li i.show{
    animation: I 1s;
  }
  @keyframes I {
    0% {
      opacity: 0.5;
      transform: scale(1,1);
    }
    100% {
      opacity: 0.0;
      transform: scale(2,2);
    }
  }
  .top-list-content{width: 100%;height: 100%}
  .fixed-nav{
    position: fixed;
    top: 40px;
    left: 0;
  }
</style>
