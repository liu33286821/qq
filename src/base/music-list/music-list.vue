<template>
  <div id="music-list" :style="{'paddingBottom':`${bottom}px`}">
    <music-common-title :lists="lists" v-if="ShowNav"></music-common-title>
    <div class="music-list">
      <ul>
        <li v-for="(item,index) in lists">
          <div v-if="ShowNum == 1" class="show-num">
            <p>{{index+1}}</p>
            <!--<p>{{item.in_count}}</p>-->
          </div>
          <div class="music-name" @click="getMusicId(item)">
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
    <div v-if="ShowLoading" class="show-loading">正在加载中.....</div>
  </div>
</template>

<script>
import MusicCommonTitle from '@/base/music-common-title/music-common-title'
import {mapActions} from 'vuex'
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
    },
    ShowNum: {
      type: Number,
      default: 0
    },
    ShowLoading: {
      type: Boolean,
      default: false
    },
    ShowNav: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    ...mapActions({
      PlayMusicList: 'PlayMusicList'
    }),
    getMusicId (item) {
      let ImgUrl = `http://y.gtimg.cn/music/photo_new/T002R150x150M000${item.albummid}.jpg`
      var data = {
        id: item.songid,
        singer: item.singer,
        songmid: item.songmid,
        songname: item.songname,
        songImage: ImgUrl,
        interval: item.interval
      }
      this.PlayMusicList({
        music: data,
        playing: true
      })
    },
  }
}
</script>
<style scoped>
  #music-list{
    background: #fff;
    color: #333;
  }
  .music-list ul{background: #fff}
  .music-list li{
    display: flex;
    flex-direction: row;
    height: 50px;
    padding: 5px 15px;
    border-bottom: 1px solid #eee;
  }
  .singer-name{
    font-size: 15px;
    line-height: 20px;
    font-family: unset;
  }
  .singer-music{font-size: 12px;line-height: 20px;color: #555}
  .singer-icon{ text-align: right; width: 15%;line-height: 40px}
  .icon-MV{font-size: 20px}
  .music-name {
    flex: 0 1 100%;
    text-align: left;
    line-height: 20px;
    font-size: 14px;
    padding-left: 10px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .show-num{line-height: 40px;font-size: 15px;text-align: center}
  .music-name p:first-child{
    width: 80%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .show-loading{
    line-height: 40px;
  }
</style>
