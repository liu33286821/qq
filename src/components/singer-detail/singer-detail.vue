<template>
  <div id="singer-detail">
    <div class="singer-title">
      <div class="back" @click="goBack">
        <i class="icon iconfont icon-xiangzuo"></i>
      </div>
      <div class="title" v-html="Singer.singerName"></div>
    </div>
    <div class="bg-image" ref="bgImage" :style="singerImage">
      <div  v-html="Singer.singerName"></div>
    </div>
    <ul class="singer-nav"  v-if="fixedTop">
      <li v-for="(item, index) in singerNav" :class="{'active': index === singerNavIndex}"><span>{{item}}</span></li>
    </ul>
    <div class="scroll-div">
      <scroll class="scroll" ref="scrollList"
              @scroll="scroll"
      :probeType="probeType" :listenScroll="listenScroll">
        <div>
          <ul class="singer-nav">
            <li v-for="(item, index) in singerNav" :class="{'active': index === singerNavIndex}"><span>{{item}}</span></li>
          </ul>
          <div class="singer-list" v-show="singerNavIndex === 0">
            <music-list :lists="MusicList"></music-list>
          </div>
        </div>
      </scroll>
    </div>

    <loading></loading>
  </div>
</template>

<script>
import {getSingerInfo} from '@/api/api'
import {SingerNameSort} from '@/api/common'
import Loading from '@/base/loading/loading'
import {mapMutations} from 'vuex'
import Scroll from '@/base/scroll/scroll'
import MusicList from '@/base/music-list/music-list'
const TOP_HEIGHT = 40
export default {
  components: {Loading, Scroll, MusicList},
  data () {
    return {
      MusicList: [],
      Singer: {},
      singerNav: ['歌曲', '详情'],
      singerNavIndex: 0,
      fixedTop: false,
      scrollY: -1
    }
  },
  computed: {
    singerImage () {
      return `background-image:url('${this.Singer.singerImage}')`
    }
  },
  created () {
    this.getSingerInfo()
    this.listenScroll = true
    this.probeType = 3
  },
  mounted () {
    this.imageHeight = this.$refs.bgImage.clientHeight
    this.minTranslateY = -this.imageHeight + TOP_HEIGHT
    this.$refs.scrollList.$el.style.top = `${this.imageHeight}px`
  },
  methods: {
    ...mapMutations(['LOADING_SHOW']),
    getSingerInfo (id = this.$route.params.id) {
      this.LOADING_SHOW(true)
      getSingerInfo(id).then((res) => {
        let list = res.data.list
        for (let i = 0; i < list.length; i++) {
          let obj = {}
          let data = list[i].musicData
          obj.albummid = data.albummid
          obj.albumname = data.albumname
          obj.albumdesc = data.albumdesc
          obj.singer = SingerNameSort(data.singer)
          obj.songmid = data.songmid
          obj.interval = data.interval
          obj.songname = data.songname
          obj.time = list[i].Fupload_time
          obj.id = data.songid
          this.MusicList.push(obj)
        }
        console.log(res.data)
        console.log(this.MusicList)
        this.Singer = {
          singerImage: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${res.data.singer_mid}.jpg?max_age=2592000`,
          singerName: res.data.singer_name
        }
        this.$nextTick(() => {
          this.LOADING_SHOW(false)
        })
      })
    },
    goBack () {
      this.$router.go(-1)
    },
    scroll (pos) {
      this.scrollY = pos.y
    }
  },
  watch: {
    scrollY (newY) {
      let translateY = Math.max(this.minTranslateY, newY)
      //这里的minTranslateY在mounted里面调用， 代表 图片高度 减去头部的高度
      let scale = 1
      let zIndex = 0
      let blur = 0
      const percent = Math.abs(newY / this.imageHeight)
      if (newY > 0) {
        scale = 1 + percent
        zIndex = 10
      } else {
        blur = Math.min(20, percent * 20)
      }
      if (newY < this.minTranslateY) {
        zIndex = 10
        this.$refs.bgImage.style.paddingTop = 0
        this.$refs.bgImage.style.height = `${TOP_HEIGHT}px`
        this.fixedTop = true
      } else {
        this.$refs.bgImage.style.paddingTop = '70%'
        this.$refs.bgImage.style.height = 0
      }
      this.$refs.bgImage.style['transform'] = `scale(${scale})`
      this.$refs.bgImage.style.zIndex = zIndex
    }
  }
}
</script>
<style scoped>
  #singer-detail {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    z-index: 150;
  }
  .singer-title{
    position: fixed;
    top: 0;
    left: 0;
    height: 40px;
    width: 100%;
    line-height: 40px;
    display: flex;
    z-index: 100;
  }
  .back {
    width: 40px;
    height: 40px;
    text-align: center;
  }
  .back .icon{font-size: 20px;color: #fff}
  .title{
    flex: 0 1 100%;
    color: #fff;
  }
  .bg-image{
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    transform-origin: top;
    background-size: cover;
  }
  .bg-image div{
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
  }
  .singer-nav{
    display: flex;
    width: 100%;
    height: 41px;
    line-height: 40px;
    border-bottom: 1px solid #eee;
    background: #fff;
  }
  .singer-nav li{
    flex: 1;
    font-size: 14px;
    line-height: 40px;
  }
  .singer-nav li span{line-height: 38px;display: inline-block;padding: 0 10px}
  .singer-nav li.active span{
    color: #31c27c;
    border-bottom: 2px solid #31c27c;
  }
  .scroll-div, .scroll-div>div{
    width: 100%;
    height: 100%;
    background: #fff;
  }
  .singer-list{
    background: #fff;
  }
  .scroll{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
</style>
