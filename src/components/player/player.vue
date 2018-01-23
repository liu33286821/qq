<template>
    <div id="player">
      <play  @show="Show"></play>
      <div class="player-list" v-if="lists.length">
        <div id="player-title">
          <i></i>
        </div>
        <div class="scroll-div" ref="scrollDiv" @click="Close">
          <div class="scroll-div2" ref="scrollDiv2">
            <div class="scroll-music-title">
              <div @click="Mode">
                <span ref="IconMode"><i :class="iconMode"></i></span>
                <span>{{playModeName[playMode % 3]}}</span>
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
        playMode: 1,
        playModeName: ['单曲循环', '顺序播放', '随机播放']
      }
    },
    computed: {
      ...mapGetters({
        lists: 'PlayMusicList',
        currentIndex: 'currentIndex',
        playing: 'playing',
        PLAY_MODE: 'playMode'
      }),
      iconMode () {
        return this.playMode % 3 === this.PLAY_MODE.sequence ? 'icon iconfont icon-xunhuanbofang'
          : this.playMode % 3 === this.PLAY_MODE.random ? 'icon iconfont icon-random'
            : 'icon iconfont icon-danquxunhuan'
      }
    },
    methods: {
      ...mapActions({
        PLAY_MUSIC: 'PlayMusic'
      }),
      Mode () {
        this.playMode ++
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
      PlayMusic (index, id) {
        this.PLAY_MUSIC({
          index: index,
          id: id
        })
      }
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
  @media screen and (-webkit-min-device-pixel-ratio: 2) {
    .scroll-div2 li { border-bottom: 0.5px solid #999 }
  }
  @media screen and (-webkit-min-device-pixel-ratio: 3) {
    .scroll-div2 li { border-bottom: 0.333333px solid #999 }
  }
</style>
