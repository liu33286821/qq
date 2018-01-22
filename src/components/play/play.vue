<template>
    <div id="fixed-play">
      <div class="play-music">
        <div  v-if="list.length">
          <div class="play-image">
            <img :src="list[index].songImage"/>
          </div>
          <div class="music-info">
            <p>{{list[index].songname}}</p>
            <p>{{list[index].singer}}</p>
            <audio :src="list[index].mp3Url" autoplay></audio>
          </div>
        </div>
        <div v-if="!list.length" class="zero-show">QQ音乐 听我想听的歌</div>
      </div>
      <div class="play-pause"><i class="icon iconfont icon-play-circle"></i></div>
      <div class="play-list"><i class="icon iconfont icon-menu"></i></div>
    </div>
</template>

<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  export default {
    name: '',
    data () {
      return {
        currentIndex: 0
      }
    },
    computed: {
      ...mapGetters({
        list: 'PlayMusicList',
        index: 'currentIndex'
      })
    },
    watch: {
      list (newMusic, oldMusic) {

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
  }
  .play-image img{width: 100%;height: 100%;border-radius: 50%}
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
    width: 40px;
    display: inline-block;
  }
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
</style>
