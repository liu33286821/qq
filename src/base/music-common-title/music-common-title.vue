<template>
  <div id="music-list-title" :class="{'show-common-title':TopTitle}">
    <div id="play-icon">
      <ul>
        <li @click="allMusic"><i class="icon iconfont icon-play-circle"></i>全部播放<span>共{{lists.length}}首</span></li>
        <li><i class="icon iconfont icon-xiazai"></i>下载</li>
        <li><i class="icon iconfont icon-list"></i>多选</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
export default {
  props: {
    lists: {
      type: Array,
      default: null
    },
    TopTitle: {
      type: Boolean,
      default: false
    },
    ImageSize: {
      type: Number,
      default: 150
    }
  },
  methods: {
    ...mapActions({
      PlayMusicList: 'PlayMusicList'
    }),
    allMusic () {
      var arr = []
      console.log(this.lists[0])
      for (let item = 0; item < this.lists.length; item++) {
        let ImgUrl = `http://y.gtimg.cn/music/photo_new/T002R${this.ImageSize}x${this.ImageSize}M000${this.lists[item].albummid}.jpg`
        var data = {
          id: this.lists[item].songid,
          singer: this.lists[item].singer,
          songmid: this.lists[item].songmid,
          songname: this.lists[item].songname,
          songImage: ImgUrl,
          interval: this.lists[item].interval
        }
        arr.push(data)
      }
      this.PlayMusicList({
        music: arr,
        playing: true
      })
    }
  }
}
</script>
<style scoped>
  #music-list-title{
    width: 100%;
    height: auto;
    position: relative;
    z-index: 1000;
    background: #fff;
  }
  #music-list-title.fixed{
    position: fixed;
    top: 40px;
    left: 0;
  }
  #play-icon .icon{
    color: #31c27c;
    font-size: 20px;
    margin-right: 7px;
  }
  #play-icon ul{
    display: flex;
    font-size: 16px;
    text-align: left;
  }
  #play-icon ul li{
    width: 70px;
  }
  #play-icon ul li:first-child{
    flex: 2;
    padding-left: 15px;
  }
  #play-icon ul li:first-child span{
    font-size: 12px;
    margin-left: 10px;
  }
  #music-list-title{
    width: 100%;
    height: auto;
    position: relative;
    z-index: 1000;
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
  }
  #music-list-title.show-common-title{color: #333;position: absolute;left: 0;top: 40px}
</style>
