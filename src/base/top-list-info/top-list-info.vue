<template>
  <transition name="top-list">
    <div id="top-list-info">
      <div class="top-list-title">
        <div class="top-common-back">
          <div @click="goBack" class="go-back"><i class="icon iconfont icon-xiangzuo"></i></div>
          <div v-if="Show" class="top-list-name">{{Info.ListName}}</div>
        </div>
      </div>
      <div class="top-list-top" :style="{'background-image': `url(${Info.pic_v12})`}">
        <div class="tlt-content">
          <p>{{Info.ListName}}</p>
          <p>{{Info.date}} 更新</p>
        </div>
      </div>
      <div class="top-list-nav">
        <ul   @click="ShowPage">
          <li :class="{'active':Active === 1}"><span>歌曲</span><i></i></li>
          <li :class="{'active':Active === 0}"><span>详情</span><i></i></li>
        </ul>
      </div>
      <div class="top-list-content" ref="tlcContent">
        <div v-if="Active === 0" class="tlc-content" v-html="Info.info"></div>
        <div v-if="Active === 1" class="tlc-music">
          <music-common-title :lists="List"></music-common-title>
          <ul>
            <li v-for="(item,index) in List">
              <div class="tlc-index">{{index}}</div>
              <div>
                <p>{{item.data.songname}}</p>
                <p>{{item.data.singer}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>

</template>

<script>
import {getTopListInfo} from '@/api/api'
import {SingerNameSort} from '@/api/common'
import MusicCommonTitle from '@/base/music-common-title/music-common-title'
export default {
  name: '',
  data () {
    return {
      Active: 1,
      Show: true,
      Info: {},
      List: [],
      timer: null
    }
  },
  components: {MusicCommonTitle},
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
        const _this = this
        this.List.forEach(function (item, index) {
          console.log(item.data)
          _this.List.data[index].singer = SingerNameSort(item.data.singer)
        })
        console.log(this.List)
      })
    },
    ShowPage (e) {
      clearTimeout(this.timer)
      let children = e.currentTarget.children
      let parentWidth = e.currentTarget.clientWidth
      if (e.pageX > parentWidth / 2) {
        this.Active = 0
      } else {
        this.Active = 1
      }
      for (var i = 0; i < children.length; i++) {
        if (children[i].className) {
          console.log(i)
          let rotateI = children[i].children[1]
          rotateI.style.left = `${e.layerX - rotateI.clientWidth / 2}px`
          rotateI.style.top = `${e.layerY - rotateI.clientHeight / 2}px`
         // rotateI.style.opacity = '0.5'
          rotateI.className = 'show'
          this.timer = setTimeout(() => {
            rotateI.className = ''
          }, 500)
        }
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
    text-align: left;
    padding: 0 15px;
    line-height: 40px;
    position: relative;
    z-index: 10;
  }
  .go-back{width: 40px;height: 40px;}
  .icon-xiangzuo{font-size: 20px;color: #fff}
  .top-list-top{
    padding-top:70%;
    position: relative;
    height: 0;
    width: 100%;
    background-size: 100% 100%;
    margin-top: -60px;
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
  .tlt-content p:last-child{font-size: 12px}
  .top-list-nav{
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #eee;
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
  .tlc-content{
    font-size: 14px;
    padding: 15px;
    text-align: left;
    line-height: 24px;
    color: #999;
  }
</style>
