<template>
    <div id="fixed-play" @click="MusicInfoShow">
      <div class="play-music">
        <div  v-if="lists.length">
          <div class="play-image" :class="{'playing': !playing}">
            <img :src="lists[index].songImage"/>
          </div>
          <div class="music-info">
            <p>{{lists[index].songname}}</p>
            <p>{{lists[index].singer}}</p>
          </div>
        </div>
        <div v-if="!lists.length" class="zero-show">QQ音乐 听我想听的歌</div>
      </div>
      <div class="play-pause" @click.stop="Pause"><i class="icon iconfont" :class="PlayToggle"></i></div>
      <div class="play-list" @click.stop="Show"><i class="icon iconfont icon-menu"></i></div>
    </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex'
export default {
  props: {
      PlayToggle: {
        type: String,
        default: ''
      }
  },
  computed : {
    ...mapGetters({
      index: 'currentIndex',
      playing: 'playing',
      lists: 'PlayMusicList'
    })
  },
  methods: {
    ...mapActions({
      PlayStatus: 'PlayStatus'
    }),
    Show (e) {
      if (!this.lists.length) {
        return
      }
      this.$emit('show', e)
    },
    MusicInfoShow () {
      this.$emit('PlayInfoShow')
    },
    Pause () {
      this.$emit('Pause')
    }
  }
}
</script>
<style scoped>
  #fixed-play {
    position: fixed;
    bottom: 0;
    left: 0;
    background: #fff;
    width: 100%;
    height: 60px;
    text-align: left;
    padding: 10px 0;
    display: flex;
    border-top: 1px solid #ccc;
    z-index: 55;
  }
  .play-music{
    flex: 4;
  }
  .play-music>div{position: relative}
  .play-image{
    width:40px;
    height: 40px;
    border-radius: 50%;
    display: inline-block;
    vertical-align: middle;
    margin: 0 15px;
    float: left;
    animation: rotateImg 20s infinite linear;
  }
  .play-image img{width: 100%;height: 100%;border-radius: 50%;}
  .music-info{
    display: inline-block;
    vertical-align: middle;
    line-height: 20px;
    width: 70%;
    position: absolute;
    left: 70px;
    top: 0;
  }
  .music-info p{
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .play-pause,.play-list{
    width: 30px;
    display: inline-block;
    text-align: center;
  }
  .play-list{margin-right: 15px}
  .play-pause .icon,.play-list .icon{
    font-size: 20px;
    line-height: 40px;
    color: #31c27c;
  }
  .zero-show{
    font-size: 16px;
    line-height: 40px;
    margin-left: 15px;
  }
  .play-image.playing{
    animation-play-state:paused;
    -webkit-animation-play-state:paused;
  }
  @keyframes rotateImg {
    from {transform: rotate(0deg)}
    to{transform: rotate(360deg)}
  }
</style>
