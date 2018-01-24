<template>
    <div id="player">
      <play  @show="Show"
             :PlayToggle="PlayToggle"
             @Pause="Pause"
      ></play>
      <div class="player-list" v-if="lists.length">
        <div id="player-title">
          <i></i>
        </div>
        <div class="scroll-div" ref="scrollDiv" @click="Close">
          <div class="scroll-div2" ref="scrollDiv2">
            <div class="scroll-music-title">
              <div class="smt_left">
                <div @click.stop="Mode">
                  <span ref="IconMode"><i :class="iconMode"></i></span>
                  <span>{{playModeName[playModeNum % 3]}}</span>
                </div>
              </div>
              <div><i class="icon iconfont icon-xiazai"></i></div>
              <div><i class="icon iconfont icon-tianjia"></i></div>
              <div><i class="icon iconfont icon-lajixiang"></i></div>
            </div>
            <div class="scroll-list">
              <scroll ref="scroll">
                <Div class="music">
                  <ul>
                    <li v-for="list,index in lists"
                        :class="{'active': index === currentIndex}"
                        @click="PlayMusic(index,list.id)"
                    >
                      <span>{{list.songname}}<small> - {{list.singer}}</small></span>
                      <i class="icon iconfont icon-favorite-outline"></i>
                      <i class="icon iconfont icon-add"></i>
                    </li>
                  </ul>
                </Div>
              </scroll>
            </div>
            <div class="close" @click="Close">
              <span>关闭</span>
            </div>
          </div>
        </div>
      </div>
      <div id="play-music-info" v-if="lists.length">
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
              <div class="song-image" :class="{'playing': !playing}">
                <img :src="lists[currentIndex].songImage"/>
              </div>
              <div>
                <p>歌词</p>
              </div>
              <ul class="button-show">
                <li :class="{'active':show % 3 === 0 }"></li>
                <li :class="{'active':show % 3 === 1 }"></li>
                <li :class="{'active':show % 3 === 2 }"></li>
              </ul>
            </div>
            <div v-if="show % 3 === 2"  class="play-music-info-lyric"></div>
          </div>
          <div class="play-music-info-bottom">
            <div class="play-music-info-time">
              <span class="time-start">0:00</span>
              <div class="process">
                <div class="process-bar">
                  <div class="process-bar2"></div>
                  <div class="process-bar-btn"></div>
                </div>
              </div>
              <span class="time-end">4:20</span>
            </div>
            <div class="play-music-info-handler">
                <i @click.stop="Mode" class="icon iconfont text-r" :class="iconMode"></i>
                <i class="icon iconfont icon-shangyishou text-r"></i>
                <i class="icon iconfont" :class="PlayToggle"></i>
                <i class="icon iconfont icon-xiayishou text-l"></i>
                <i class="icon iconfont icon-menu text-l"></i>
            </div>
            <div class="play-music-info-button">
            </div>
          </div>
        </div>
      </div>
      <audio v-if="lists.length" ref="Audio" :src="lists[currentIndex].mp3Url" autoplay></audio>
    </div>
</template>

<script>
  import Play from '@/base/play/play'
  import Scroll from '@/base/scroll/scroll.vue'
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  export default {
    components: {Scroll, Play},
    data () {
      return {
        playModeName: ['单曲循环', '顺序播放', '随机播放'],
        show: 1  //滑动 0 1 2 显示3个页面
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
        return this.playModeNum % 3 === this.PLAY_MODE.sequence ? 'icon iconfont icon-xunhuanbofang'
          : this.playModeNum % 3 === this.PLAY_MODE.random ? 'icon iconfont icon-random'
            : 'icon iconfont icon-danquxunhuan'
      },
      PlayToggle () {
        return this.playing ? 'icon-zanting' : 'icon-play-circle'
      },
    },
    methods: {
      ...mapActions({
        PLAY_MUSIC: 'PlayMusic'
      }),
      Mode () {
        this.$store.dispatch('PlayModeNum')
      },
      Close () {
        this.$refs.scrollDiv2.style.transform = 'translate3d(0,100%,0)'
        this.$refs.scrollDiv.style.opacity = '0'
        this.$refs.scrollDiv.style.zIndex = '-1'
      },
      Show (e) {
        this.$refs.scrollDiv2.style.transform = 'translate3d(0,0,0)'
        this.$refs.scrollDiv.style.opacity = '1'
        this.$refs.scrollDiv.style.zIndex = '100'
      },
      Pause () {
        let audio = this.$refs.Audio
        if (!audio.paused) {
          audio.pause()
          this.PlayStatus({
            status: false
          })
        } else {
          audio.play()
          this.PlayStatus({
            status: true
          })
        }
      },
      PlayMusic (index, id) {
        this.PLAY_MUSIC({
          index: index,
          id: id
        })
      }
    },
    watch: {
      currentTime () {
        return this.$refs.Audio.currentTime
      }
    },
    updated () {
      console.log(this.currentTime)
      console.log(this.$refs.Audio.currentTime)
    }
  }
</script>
<style scoped>
  .scroll-div{
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.3);
    width: 100%;
    height: 100%;
    transition: all .3s;
    z-index: -1;
  }
  .scroll-div2{
    width: 100%;
    height: auto;
    position: absolute;
    bottom: 0;
    left: 0;
    color: #fff;
    transform: translate3d(0,100%,0);
    transition: all .3s;
  }
  .close,.scroll-music-title{
    width: 100%;
    height: 60px;
    background: #cccccc;
    line-height: 60px;
    background: rgba(21,39,31,.9);
    font-size: 14px;
  }
  .scroll-music-title{height: 50px;line-height: 50px}
  .scroll-div2 li{
    line-height: 40px;
    height: 40px;
    width: 100%;
    padding: 0 15px;
    border-bottom: 1px solid #999;
  }
  .scroll-div2 li small{font-size: 12px}
  .scroll-music-title .icon{
    font-size: 20px;
    vertical-align: middle;
  }
  .scroll-music-title{display: flex;padding: 0 15px}
  .scroll-music-title>div {
    flex: 1;
  }
  .scroll-music-title>div:first-child{flex: 5;text-align: left}
  .scroll-music-title>div:first-child span{
    display: inline-block;
    line-height: 50px;
    height: 50px;
  }
  .scroll-list{
    height: 400px;
    background: rgba(21,39,31,1);
    text-align: left;
  }
  .scroll-list>div{height: 100%;overflow: hidden}
  .music .iconfont {
    font-size: 20px;
    width: 30px;
    height: 30px;
    float: right;
    text-align: center;
  }
  .active span{color: #31c27c}
  .smt_left>div{width: 120px}
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
  .song-image{
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
  .button-show li.active{background: #fff}
  .play-music-info-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 150px;
    width: 100%;
  }
  .play-music-button-cut{
    display: inline-block;
  }
  .play-music-info-handler{
    text-align: left;
    padding: 0 20px;
    display: flex;
  }
  .play-music-info-handler .icon{
    font-size: 24px;
    flex: 1;
    vertical-align: middle;
    line-height: 30px;
  }
  .play-music-info-handler .icon-shangyishou,
  .play-music-info-handler .icon-play-circle,
  .play-music-info-handler .icon-zanting,
  .play-music-info-handler .icon-xiayishou{color: #31c27c;font-size: 30px}
  .play-music-info-handler .icon-play-circle,
  .play-music-info-handler .icon-zanting{
    font-size: 40px;
    text-align: center;
    padding: 0 20px;
  }
  .play-music-info-time{
    display: flex;
    padding: 0 20px;
    margin-bottom: 20px;
    line-height: 30px;
  }
  .time-start,.time-end{flex: 0 0 30px}
  .play-music-info-time>div{
    flex: 1;
    height: 5px;
    background: rgba(0,0,0,0.5);
    margin: 0 10px;
    top: 11px;
    position: relative;
    border-radius: 5px;
  }

  .play-music-info-image div.playing{
    animation-play-state:paused;
    -webkit-animation-play-state:paused;
  }
  @keyframes rotateImg {
    from {transform: rotate(0deg)}
    to{transform: rotate(360deg)}
  }
  @media screen and (-webkit-min-device-pixel-ratio: 2) {
    .scroll-div2 li { border-bottom: 0.5px solid #999 }
  }
  @media screen and (-webkit-min-device-pixel-ratio: 3) {
    .scroll-div2 li { border-bottom: 0.333333px solid #999 }
  }
</style>
