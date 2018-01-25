<template>
    <div id="play-music-info" style="display: none" @click="Show" v-if="lists.length">
      <div class="play-music-bg"  :style="{'backgroundImage':`url(${lists[currentIndex].songImage})`}"></div>
      <div class="content">
        <div class="play-music-info-top">
          <i class="icon iconfont icon-xiala2"></i>
          <div class="play-music-info-title">
            <span>{{lists[currentIndex].songname}}</span>
          </div>
          <i class="icon iconfont icon-listmore"></i>
        </div>
        <div class="play-music-info-center">
          <div v-if="show % 3 === 0" class="play-music-info-content">
            <ul>
              <li>
                <div><img src=""/></div>
                <div><p>歌手：赵雷</p></div>
              </li>
              <li>
                <div><img src=""/></div>
                <div><p>专辑：十九岁</p></div>
              </li>
            </ul>
          </div>
          <div v-if="show % 3 === 1"  class="play-music-info-image">
            <p>— {{lists[currentIndex].singer}} —</p>
            <p>
              <span>标准</span>
              <span>音效</span>
            </p>
            <div :class="{'playing': !playing}">
              <img :src="lists[currentIndex].songImage"/>
            </div>
            <ul class="button-show">
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div v-if="show % 3 === 2"  class="play-music-info-lyric"></div>
        </div>
        <div class="play-music-info-bottom">
          <div class="play-music-info-time"></div>
          <div class="play-music-info-handler"></div>
          <div class="play-music-info-button">
            <div @click.stop="Mode">
              <span ref="IconMode"><i class="icon iconfont" :class="iconMode"></i></span>
              <span>{{playModeName[playModeNum % 3]}}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: '',
  data () {
    return {
      playModeName: ['单曲循环', '顺序播放', '随机播放'],
      show: 1
    }
  },
  computed: {
    ...mapGetters({
      lists: 'PlayMusicList',
      currentIndex: 'currentIndex',
      playing: 'playing',
      PLAY_MODE: 'playMode',
      playModeNum: 'playModeNum'
    }),
    iconMode () {
      return this.playModeNum % 3 === this.PLAY_MODE.sequence ? 'icon-xunhuanbofang'
        : this.playModeNum % 3 === this.PLAY_MODE.random ? 'icon-random'
          : 'icon-danquxunhuan'
    },
  },
  methods: {
    Show () {
      console.log(this.playing)
    }
  }
}
</script>
<style scoped>
  #play-music-info {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    color: #fff;
    background: #000000;
  }
  .play-music-bg{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-size: 130% 130%;
    -ms-filter: blur(10px);
    filter:blur(10px);
  }
  #play-music-info .content{
    position: relative;
    z-index: 50;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.4);
  }
  .play-music-info-top{
    position: relative;
    text-align: left;
    line-height: 40px;
    height: 40px;
  }
  .play-music-info-top .icon {
    font-size: 20px;
    width: 40px;
    height: 40px;
    display: inline-block;
    line-height: 40px;
    text-align: center;
  }
  .icon-xiala2{
    float: left;
  }
  .icon-listmore{
    position: absolute;
    right: 0;
    top: 0;
  }
  .play-music-info-top div{
    display:block;
    text-align: center;
    margin: 0 40px;
  }
  .play-music-info-center {
    position: fixed;
    left: 0;
    top: 40px;
    bottom: 150px;
    width: 100%;
    height: 100%;
  }
  .play-music-info-image{
    width: 100%;
    height: 100%;
  }
  .play-music-info-image p{
    line-height: 30px;
    font-size: 12px;
    margin-bottom:2%;
  }
  .play-music-info-image p:nth-child(2){
    margin-bottom: 5%;
    line-height: 20px;
  }
  .play-music-info-image p:nth-child(2) span{
    border: 1px solid #fff;
    padding: 2px 8px;
    border-radius: 5px;
  }
  .play-music-info-image img{
    width:100%;
    height: 100%;
    border-radius: 50%;
  }
  .play-music-info-image div{
    background: rgba(0,0,0,0.1);
    margin:3% 10%;
    border: 5px solid rgba(0,0,0,0.1);
    border-radius: 50%;
    margin-bottom: 20px;
  }
  .button-show{
    width: 100%;
    display: inline-block;
  }
  .button-show li{
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(255,255,255,.3);
    display: inline-block;
  }
  .play-music-info-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 150px;
    width: 100%;
    background: #555;
  }





  .play-music-info-image div.playing{
    animation-play-state:paused;
    -webkit-animation-play-state:paused;
  }
  @keyframes rotateImg {
    from {transform: rotate(0deg)}
    to{transform: rotate(360deg)}
  }
</style>
