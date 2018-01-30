<template>
  <div id="player">
    <play @show="Show"
          :PlayToggle="PlayToggle"
          @Pause="Pause"
          @PlayInfoShow="PlayInfoShow"
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
                <span>{{lists.length}}</span>
              </div>
            </div>
            <div><i class="icon iconfont icon-xiazai"></i></div>
            <div><i class="icon iconfont icon-tianjia"></i></div>
            <div><i class="icon iconfont icon-lajixiang" @click.stop="remove(lists)"></i></div>
          </div>
          <div class="scroll-list">
            <scroll ref="scroll">
              <Div class="music">
                <ul>
                  <li v-for="list,index in lists"
                      :class="{'active': index === currentIndex}"
                      @click="PlayMusic(index,list.id)">
                    <span>{{list.songname}}<small> - {{list.singer}}</small></span>
                    <i class="icon iconfont icon-close" @click.stop="remove(index)"></i>
                    <i class="icon iconfont icon-favorite-outline"></i>
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
    <transition name="fade">
      <div id="play-music-info" v-if="lists.length" v-show="PlayMusicInfoShow">
          <div class="play-music-bg" :style="{'backgroundImage':`url(${lists[currentIndex].songImage})`}"></div>
          <div class="content">
            <div class="play-music-info-top">
              <i class="icon iconfont icon-xiala2" @click="PlayInfoHide"></i>
              <div class="play-music-info-title">
                <span>{{lists[currentIndex].songname}}</span>
              </div>
              <i class="icon iconfont icon-listmore"></i>
            </div>
            <div class="play-music-info-center"  @touchstart="TouchStart"
                 @touchmove="TouchMove"
                 @touchend = "TouchEnd">
              <transition name="content">
                <div v-show="show % 2 === 0" class="play-music-info-image">
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
                </div>
              </transition>
              <transition name="content">
                <div v-show="show % 2 === 1" class="play-music-info-lyric">
                  <p ref="lyricLine">暂无歌词</p>
                </div>
              </transition>
              <ul class="button-show">
                <li :class="{'active':show % 2 === 0 }"></li>
                <li :class="{'active':show % 2 === 1 }"></li>
              </ul>
            </div>
            <div  class="play-music-info-bottom">
              <div class="play-music-info-time">
                <span class="time-start">{{format(currentTime)}}</span>
                <div class="process" ref="processDiv">
                  <div class="process-bar2" ref="progress"></div>
                  <div class="process-bar-btn"
                       @touchstart.prevent="ProcessBtnTouchStart"
                       @touchmove.prevent="ProcessBtnTouchMove"
                       @touchend.prevent="ProcessBtnTouchEnd"
                       ref="progressBtn"></div>
                </div>
                <span class="time-end">{{format(lists[currentIndex].interval)}}</span>
              </div>
              <div class="play-music-info-handler">
                <div class="text-r">
                  <i @click.stop="Mode" class="icon iconfont" :class="iconMode"></i>
                </div>
                <div class="text-r">
                  <i class="icon iconfont icon-shangyishou" @click="Prev"></i>
                </div>
                <div id="pause">
                  <i class="icon iconfont" :class="PlayToggle" @click="Pause"></i>
                </div>
                <div class="text-l">
                  <i class="icon iconfont icon-xiayishou" @click="Next"></i>
                </div>
                <div class="text-l">
                  <i class="icon iconfont icon-menu" @click="Show"></i>
                </div>
              </div>
              <div class="play-music-info-button">
              </div>
            </div>
          </div>
        </div>
    </transition>
    <audio v-if="lists.length"
           ref="Audio"
           :src="lists[currentIndex].mp3Url"
           @timeupdate="timeupdate"
           @ended="end"
           autoplay></audio>
    <div id="play-mode-show" ref="PlayModeShow"><p>已选中{{playModeName[playModeNum%3]}}</p></div>
  </div>
</template>

<script type="es6">
import Play from '@/base/play/play'
import Scroll from '@/base/scroll/scroll.vue'
import { mapGetters, mapActions, mapMutations } from 'vuex'

const progressBtnWidth = 16 //播放按钮圆点的宽度
export default {
  components: {Scroll, Play},
  data () {
    return {
      playModeName: ['单曲循环', '顺序播放', '随机播放'],
      show: 0,  //滑动 0 1 显示2个页面
      currentTime: 0,
      PlayMusicInfoShow: false,
      currentLyric: null,
      currentLyricNumber: 0,
      playingLyric: '',
      ready: false,
      timer: null
    }
  },
  created () {
    this.touches = {} //用来保存滑动的变量
    this.touch = {}   //用来保存歌曲时间滑动
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
      processWidth () {
        if (this.lists.length) return this.currentTime / this.lists[this.currentIndex].interval
      }
    },
  methods: {
    ...mapActions({
      PLAY_MUSIC: 'PlayMusic',
      ReduceCurrentIndex: 'ReduceCurrentIndex'
    }),
    ...mapMutations({
      CURRENT_INDEX: 'CURRENT_INDEX',  //更改播放索引
      PLAY_STATUS: 'PLAY_STATUS',     // 更改播放状态
      PLAY_MODE_NUM: 'PLAY_MODE_NUM',
      PLAYING: 'PLAYING',
      REMOVE: 'REMOVE'
    }),
    timeupdate (e) { //更新播放时间
        this.currentTime = e.target.currentTime
      },
    format (interval) { //格式化时间
        interval = Math.floor(interval)
        const minute = Math.floor(interval / 60)
        const second = Math.floor(interval % 60) < 10 ? `0${Math.floor(interval % 60)}` : Math.floor(interval % 60)
        return `${minute}:${second}`
      },
    Mode () {//监听了播放模式的循环
      this.PLAY_MODE_NUM()
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.$refs.PlayModeShow.style['transform'] = `translate3d(0,0,0)`
      this.timer = setTimeout(() => {
        this.$refs.PlayModeShow.style['transform'] = `translate3d(0,-30px,0)`
      }, 1000)
    },
    Close () { //关闭播放页面
        this.$refs.scrollDiv2.style.transform = 'translate3d(0,100%,0)'
        this.$refs.scrollDiv.style.opacity = '0'
        this.$refs.scrollDiv.style.zIndex = '-1'
      },
    Show (e) {//展开播放页面
        this.$refs.scrollDiv2.style.transform = 'translate3d(0,0,0)'
        this.$refs.scrollDiv.style.opacity = '1'
        this.$refs.scrollDiv.style.zIndex = '100'
      },
    Pause () {//暂停
        let audio = this.$refs.Audio
        if (!audio.paused) {
          audio.pause()
          this.PLAY_STATUS(false)
        } else {
          audio.play()
          this.PLAY_STATUS(true)
        }
      },
    loop () {
      this.$refs.Audio.currentTime = 0
      this.$refs.Audio.play()
    },
    Next () {
      if (this.lists.length === 1) {  //如果只有一首歌
        this.$refs.Audio.currentTime = 0
        this.$refs.Audio.play()
      }
      if (this.playModeNum % 3 === 2) {  //只有当等于随机模式的才会走这里。  否则的话按顺序播放
        let index = Math.max(0, Math.ceil(Math.random() * this.lists.length))
        console.log(index)
        this.CURRENT_INDEX(index)
      } else {
        let index = this.currentIndex + 1
        if (index === this.lists.length) {
          index = 0
        }
        this.CURRENT_INDEX(index)
      }
      this.PLAY_STATUS(true)
      this.ready = false
    },
    Prev () {
      if (this.lists.length === 1) {
        this.$refs.Audio.currentTime = 0
        this.$refs.Audio.play()
      } else {
        let index = this.currentIndex - 1
        if (index === -1) {
          index = this.lists.length - 1
        }
        this.CURRENT_INDEX(index)
      }
      this.PLAY_STATUS(true)
      this.ready = false
    },
    end () {
      this.PLAY_STATUS(false) //播放暂停。
      if (this.playModeNum % 3 === 0 || this.lists.length === 1) {  //单曲循环模式
        this.$refs.Audio.currentTime = 0
        this.$refs.Audio.play()
        this.PLAY_STATUS(true)
        return
      }
      this.Next()
    },
    remove (list) {
      this.REMOVE(list)
      this.PLAY_STATUS(false)
    },
    PlayMusic (index, id) { //获取点击选中的播放
      this.PLAY_MUSIC({
        index: index,
        id: id
      })
    },
    PlayInfoHide () { //播放详情页面隐藏
      this.PlayMusicInfoShow = false
    },
    PlayInfoShow () { //播发详情页面显示
      this.PlayMusicInfoShow = true
    },
    TouchStart (e) {
      this.touches.Start = true //开始滑动
      const touch = e.touches[0]
      this.touches.startX = touch.pageX //滑动的左距离
      this.touches.startY = touch.pageX //滑动的上下距离
    },
    TouchMove (e) {
      if (!this.touches.Start) return  //如果在开始的时候没有设置成true  那么就返回出去 不进行滑动
      //进行获取滑动的距离
      const touch = e.touches[0]
      let MoveX = touch.pageX - this.touches.startX //滑动偏移的距离
      let MoveY = touch.pageY - this.touches.startY
      //滑动的时候 有可能从上向下滑动， 那么就需要返回 不就行任何操作 Math.abs() 返回绝对值， 如果说值为负数也会返回正值
      if (Math.abs(MoveY) > Math.abs(MoveX)) return
      //console.log(MoveX, MoveY, this.playModeNum)
      /*
      * 考虑到从中间滑动屏幕， 如果this.playModeNum 为1 并且 滑动的距离大于0 的话 那么就把 playModeNum 变为1
      * 如果 playModeNum 为0  并且滑动距离大于0 不做任何操作， 否则的话playModeNum 等于1
      * 如果当前playMode为1  并且滑动距离大于0的话 那么playModeNum为2
      * 如果playModeNum 为2  并且滑动距离大于0的话 不做任何操作 否则的话 playModeNum 等于1
      * */
      if (this.show === 1 && MoveX > 0) {
        this.show = 0
      }
      if (this.show === 0 && MoveX < 0) {
        this.show = 1
      }
    },
    TouchEnd (e) {},
    ProcessBtnTouchStart (e) {
      const touch = e.touches[0]
      this.touch.initated = true
      this.touch.startX = touch.pageX
      this.touch.left = this.$refs.progress.clientWidth  //当前圆点距离左边的位置。
      this.$refs.Audio.pause()
      this.PLAY_STATUS(false)
    },
    ProcessBtnTouchMove (e) {
      if (!this.touch.initated) return
      const delaX = e.touches[0].pageX - this.touch.startX
      const offsetWidth = Math.min(this.$refs.processDiv.clientWidth - progressBtnWidth, Math.max(0, this.touch.left + delaX))
      this.$refs.progress.style.width = `${offsetWidth}px`
      this.$refs.progressBtn.style['transform'] = `translate3d(${offsetWidth}px,0,0)`
    },
    ProcessBtnTouchEnd (e) {
      this.touch.initated = false
      const barWidth = this.$refs.processDiv.clientWidth - progressBtnWidth
      const precent = this.$refs.progress.clientWidth / barWidth
      //console.log(barWidth, precent, this.$refs.processDiv.clientWidth)
      const currentTime = this.lists[this.currentIndex].interval * precent
      //console.log(this.currentTime)
      this.$refs.Audio.currentTime = currentTime
      this.$refs.Audio.play()
      this.PLAY_STATUS(true)
    }
  },
  watch: {
    processWidth (newWidth) {//监听设置播放的宽度
      if (newWidth > 0) {
        const processbarWidth = this.$refs.processDiv.clientWidth - progressBtnWidth
        const offsetWidth = newWidth * processbarWidth
        this.$refs.progress.style.width = `${offsetWidth}px`
        this.$refs.progressBtn.style['transform'] = `translate3d(${offsetWidth}px,0,0)`
      }
    }
  }
}
</script>
<style scoped>
  .scroll-div {
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 100%;
    transition: all .3s;
    z-index: -1;
  }

  .scroll-div2 {
    width: 100%;
    height: auto;
    position: absolute;
    bottom: 0;
    left: 0;
    color: #fff;
    transform: translate3d(0, 100%, 0);
    transition: all .3s;
  }

  .close, .scroll-music-title {
    width: 100%;
    height: 60px;
    background: #cccccc;
    line-height: 60px;
    background: rgba(21, 39, 31, .9);
    font-size: 14px;
  }

  .scroll-music-title {
    height: 50px;
    line-height: 50px
  }

  .scroll-div2 li {
    line-height: 40px;
    height: 40px;
    width: 100%;
    padding: 0 15px;
    border-bottom: 1px solid #999;
  }

  .scroll-div2 li small {
    font-size: 12px
  }
  .scroll-div2 li span:first-child{
    width: 70%;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .scroll-music-title .icon {
    font-size: 20px;
    vertical-align: middle;
  }

  .scroll-music-title {
    display: flex;
    padding: 0 15px
  }

  .scroll-music-title > div {
    flex: 1;
  }

  .scroll-music-title > div:first-child {
    flex: 5;
    text-align: left
  }

  .scroll-music-title > div:first-child span {
    display: inline-block;
    line-height: 50px;
    height: 50px;
  }

  .scroll-list {
    height: 400px;
    background: rgba(21, 39, 31, 1);
    text-align: left;
  }

  .scroll-list > div {
    height: 100%;
    overflow: hidden
  }

  .music .iconfont {
    font-size: 20px;
    width: 30px;
    height: 30px;
    float: right;
    text-align: center;
  }

  .active span {
    color: #31c27c;
    display: inline-block;
    width: 68%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .smt_left > div {
    width: 120px
  }

  #play-music-info {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    color: #fff;
    background: #000000;
  }

  .play-music-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-size: 130% 130%;
    -ms-filter: blur(10px);
    filter: blur(10px);
  }

  #play-music-info .content {
    position: relative;
    z-index: 50;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .play-music-info-top {
    position: relative;
    text-align: left;
    line-height: 40px;
    height: 40px;
    transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
  }

  .play-music-info-top .icon {
    font-size: 20px;
    width: 40px;
    height: 40px;
    display: inline-block;
    line-height: 40px;
    text-align: center;
  }

  .icon-xiala2 {
    float: left;
  }

  .icon-listmore {
    position: absolute;
    right: 0;
    top: 0;
  }

  .play-music-info-top div {
    display: block;
    text-align: center;
    margin: 0 40px;
  }
  .play-music-info-title span{
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: inline-block;
  }

  .play-music-info-center {
    position: fixed;
    left: 0;
    top: 40px;
    bottom: 150px;
    width: 100%;
    height: 100%;
  }

  .play-music-info-image {
    width: 100%;
    height: 100%;
  }

  .play-music-info-image p {
    line-height: 18px;
    font-size: 12px;
    margin-bottom: 1%;
  }

  .play-music-info-image p:nth-child(2) {
    margin-bottom: 5%;
    line-height: 20px;
  }

  .play-music-info-image p:nth-child(2) span {
    border: 1px solid #fff;
    padding: 2px 8px;
    border-radius: 5px;
  }

  .play-music-info-image img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 10px solid rgba(255, 255, 255, 0.1);
    border-radius: 50%
  }

  .song-image {
    margin: 4% 10% 5%;
    animation: rotateImg 45s infinite linear;
  }

  .button-show {
    width: 100%;
    display: inline-block;
    position: absolute;
    bottom: 140px;
    z-index: 100;
    left: 0;
  }

  .button-show li {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(255, 255, 255, .3);
    display: inline-block;
  }

  .button-show li.active {
    background: #fff
  }

  .play-music-info-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 100px;
    width: 100%;
    transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
  }

  .play-music-button-cut {
    display: inline-block;
  }

  .play-music-info-handler {
    text-align: left;
    padding: 0 20px;
    display: flex;
  }
  .play-music-info-handler>div{flex: 1}
  .play-music-info-handler .icon {
    font-size: 24px;
    vertical-align: middle;
    line-height: 30px;
  }

  .play-music-info-handler .icon-shangyishou,
  .play-music-info-handler .icon-play-circle,
  .play-music-info-handler .icon-zanting,
  .play-music-info-handler .icon-xiayishou {
    color: #31c27c;
    font-size: 30px
  }

  .play-music-info-handler .icon-play-circle,
  .play-music-info-handler .icon-zanting {
    font-size: 40px;
  }
  #pause{text-align: center; padding: 0 20px;}

  .play-music-info-time {
    display: flex;
    padding: 0 20px;
    margin-bottom: 20px;
    line-height: 30px;
  }

  .time-start, .time-end {
    flex: 0 0 30px
  }

  .play-music-info-time > div {
    flex: 1;
    height: 3px;
    background: rgba(0, 0, 0, 0.5);
    margin: 0 10px;
    top: 13px;
    position: relative;
    border-radius: 5px;
  }
  .process-bar2{
    width: 0;
    height: 3px;
    background: #31c27c;
  }
  .process-bar-btn{
    width: 16px;
    height: 16px;
    background: #31c27c;
    border-radius: 50%;
    position: relative;
    top: -9px;
    left: 0;
  }
  .play-music-info-image div.playing {
    animation-play-state: paused;
    -webkit-animation-play-state: paused;
  }
  .fade-enter-active,
  .fade-leave-active,
  .content-enter-active,
  .content-leave-active{
    transition: all .5s;
  }

  .content-enter-active .content{}
  .fade-enter-active .play-music-info-top,
  .fade-leave-active .play-music-info-top,
  .fade-enter-active .play-music-info-bottom,
  .fade-leave-active .play-music-info-bottom{transition: all .5s cubic-bezier(0.86, 0.18, 0.82, 1.32);}
  .fade-enter, .fade-leave-to,
  .content-enter, .content-leave-to {
    opacity: 0;
  }
  .fade-enter .play-music-info-top,
  .fade-leave-to .play-music-info-top{
    transform: translate3d(0, -100px, 0)
  }
  .fade-enter .play-music-info-bottom,
  .fade-leave-to .play-music-info-bottom{
    transform: translate3d(0, 100px, 0)
  }

  @keyframes rotateImg {
    from {
      transform: rotate(0deg)
    }
    to {
      transform: rotate(360deg)
    }
  }

  #play-mode-show{
    position: fixed;
    top: 0px;
    left: 0;
    width: 100%;
    padding: 5px 0;
    height: 30px;
    text-align: left;
    background: #31c27c;
    line-height: 20px;
    font-size: 12px;
    text-indent: 20px;
    color: #fff;
    transition: all .5s;
    transform: translate3d(0,-30px,0);
  }

  .remove{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.3);
    z-index:1001;
    display: none;
  }
  .remove-content{
    width: 60%;
    height: 200px;
    background: #fff;
    border-radius: 10px;
  }

  @media screen and (-webkit-min-device-pixel-ratio: 2) {
    .scroll-div2 li {
      border-bottom: 0.5px solid #999
    }
  }

  @media screen and (-webkit-min-device-pixel-ratio: 3) {
    .scroll-div2 li {
      border-bottom: 0.333333px solid #999
    }
  }
</style>
