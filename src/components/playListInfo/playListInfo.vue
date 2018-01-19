<template>
    <div class="play-list-info" ref="cdList"   v-if="cdList">
      <div class="play-list-top">
        <i class="icon iconfont icon-xiangzuo" @click="goBack"></i>
        <p>歌单</p>
        <p v-if="ShowTitle">{{cdList.dissname}}</p>
      </div>
      <scroll ref="scroll" class="scroll">
        <div class="scroll-div">
          <div class="music-title clearfix" >
            <div class="music-title-bg" ref="musicTitleBg" :style="{backgroundImage:`url(${cdList.logo})`}"></div>
            <div class="music-title-con clearfix" ref="musciTitleCon">
              <div class="music-title-l">
                <img :src="cdList.logo" ref="musicTitleImage"  width="100%" height="100%"/>
                <div class="music-title-l-bottom">
                  <p><i class="icon iconfont icon-toudaierji"></i><span>{{PlayNum}}</span></p>
                </div>
              </div>

              <div class="music-title-r">
                <h2>{{cdList.dissname}}</h2>
                <p>简介：<Span v-html="cdList.desc"></Span></p>
              </div>
            </div>
            <favorite></favorite>
          </div>
          <div class="music-list"></div>
        </div>
      </scroll>
      <error-info :Info="errorInfo" v-show="errorInfo.status"></error-info>
    </div>
</template>

<script>
import {getPlayListInfo} from '@/api/api'
import Scroll from '@/base/scroll/scroll.vue'
import Favorite from '@/base/favorite/favorite'
import errorInfo from '@/base/error-info/error-info'
import {mapGetters} from 'vuex'
const PaddingHeight = 130
export default {
  components: {Scroll, Favorite, errorInfo},
  name: '',
  data () {
    return {
      cdList: null,
      ShowTitle: false
    }
  },
  computed: {
    PlayNum () {
      let num = this.cdList.visitnum + ''
      if (num.length > 4) {
        let num2 = num.substr(0, num.length - 4)
        return num2 + '万'
      }
    },
    ...mapGetters(['errorInfo'])
  },
  mounted () {
    let id = this.$route.params.id
    getPlayListInfo(id).then((res) => {
      this.cdList = res.cdlist[0]
    })
  },
  updated () {
    let _this = this
    window.addEventListener('resize', function () {
      _this.getBgHeight()
    })
  },
  methods: {
    getDataa () {
      return 455
    },
    getData (id) {
      getPlayListInfo(id).then((res) => {
        this.cdList = res.cdlist[0]
      })
    },
    getBgHeight () {
      let ImgHeight = this.$refs.musicTitleImage.clientHeight
      this.$refs.musicTitleBg.style.width = `100%`
      this.$refs.musicTitleBg.style.height = `${ImgHeight + PaddingHeight}px`
      console.log(this.$refs.musicTitleImage.clientWidth)
    },
    goBack () {
      this.$router.go(-1)
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
    font-size: 24px;
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
    width: 100%;
    height: 110%;
  }
  .music-title{
    position: relative;
  }
  .music-title-con{
    position: relative;
    z-index: 10;
    padding:15px;
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
    line-height: 24px;
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
    margin-right: 10px;
    vertical-align: middle;
    font-size: 20px;
  }
  .music-title-l-bottom span{
    vertical-align: middle;
    font-size: 14px;
  }
</style>
