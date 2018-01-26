<template>
  <div id="music-list" :style="{'paddingBottom':`${bottom}px`}">
    <music-common-title :lists="lists"></music-common-title>
    <div class="music-list">
      <ul>
        <li v-for="item in lists">
          <div @click="getMusicId(item)">
            <p class="singer-name text">{{item.songname}}</p>
            <p class="singer-music text">{{item.singer}}</p>
          </div>
          <div class="singer-icon">
            <i class="icon iconfont icon-MV" v-if="item.vid!==''"></i>
            <i class="icon iconfont icon-listmore"></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import MusicCommonTitle from '@/base/music-common-title/music-common-title'
import {getPlayMusic} from '@/api/api'
import {mapActions} from 'vuex'
import {Base64} from 'js-base64'
export default {
  components: {MusicCommonTitle},
  props: {
    lists: {
      type: Array,
      default: null
    },
    bottom: {
      type: Number,
      default: 0
    }
  },
  methods: {
    ...mapActions({
      PlayMusicList: 'PlayMusicList'
    }),
    getMusicId (item) {
      var lyric
      getPlayMusic(item.songid).then((res) => {
        lyric = res.lyric
        this.$nextTick(() => {
          let ImgUrl = `http://y.gtimg.cn/music/photo_new/T002R150x150M000${item.albummid}.jpg`
          var data = {
            id: item.songid,
            singer: item.singer,
            songmid: item.songmid,
            songname: item.songname,
            songImage: ImgUrl,
            interval: item.interval,
            lyric: lyric
          }
          this.PlayMusicList({
            music: data,
            playing: true
          })
        })
      })
    }
  }
}
</script>
<style scoped>
  #music-list{
    background: #fff;
    color: #333;
  }
  .music-list li{
    line-height: 40px;
    display: flex;
    text-align: left;
    padding:5px 10px 5px 15px ;
    border-bottom: 1px solid #cccccc;
  }
  .music-list li>div:first-child{
    width: 85%;
  }
  .singer-name{
    font-size: 15px;
    line-height: 20px;
    font-family: unset;
  }
  .singer-music{font-size: 12px;line-height: 20px;color: #555}
  .singer-icon{ text-align: right; width: 15%}
  .icon-MV{font-size: 20px}
</style>
