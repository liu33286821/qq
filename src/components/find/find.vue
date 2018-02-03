<template>
  <div id="find">
    <div class="search-top">
      <div class="back" @click="goBack"><i class="icon iconfont icon-xiangzuo"></i></div>
      <div class="search-form">
        <input type="text" placeholder="搜索音乐、MV、歌单、用户" v-model="SearchValue"/>
      </div>
      <div class="back" @click="Remove"><i class="icon iconfont icon-close"></i></div>
    </div>
    <div v-if="SearchValue">
      <div class="search-keys" v-if="SearchValue">
        <p>搜索 "{{SearchValue}}"</p>
      </div>
      <scroll class="scroll" ref="scrollDiv"
              @scroll="scroll"
              :probeType="probeType"
              :listenScroll="listenScroll">
        <div class="search-list">
          <music-list :lists="List" :ShowNav="ShowNav"></music-list>
        </div>
      </scroll>
    </div>
    <div v-if="!SearchValue" class="hot-search">
      <div class="hot-list clearfix">
        <p>热门搜索</p>
        <ul>
          <li @click="getValue(HotList.special_key)">{{HotList.special_key}}</li>
          <li v-for="(item, index) in HotList.hotkey"
              v-show="index < 7" @click="getValue(item.k)">{{item.k}}</li>
        </ul>
      </div>
      <div class="history-list clearfix" v-if="historySearch">
        <div>
          <p>搜索历史</p>
          <span class="history-all" @click="RemoveHistory">清空历史</span>
        </div>
        <ul>
          <li v-for="(item, index) in historySearch">
            <p>{{item}}</p>
            <p><i class="icon iconfont icon-close"></i></p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {getSearch, getSearchHot} from '@/api/api'
import {SingerNameSort} from '@/api/common'
import Scroll from '@/base/scroll/scroll'
import MusicList from '@/base/music-list/music-list'
const HEIGHT = 80
export default {
  components: {Scroll, MusicList},
  data () {
    return {
      SearchValue: '',
      List: [],
      HotList: [],
      historySearch: ['搜索历史'],
      scrollY: 0,
      ShowNav: false
    }
  },
  created () {
    this.listenScroll = true
    this.probeType = 3
  },
  mounted () {
    this._initData()
  },
  updated () {
    if (this.SearchValue) {
      this._initHeight()
    }
  },
  methods: {
    _initData () {
      getSearchHot().then((res) => {
        let arr = res.split('hotSearchKeysmod_top_search(')[1]
        let data = arr.slice(0, arr.length - 1)
        data = JSON.parse(data)
        this.HotList = data.data
      })
    },
    goBack () {
      this.$router.go(-1)
    },
    Remove () {
      this.SearchValue = ''
    },
    RemoveHistory () {
      this.historySearch = []
    },
    getValue (value) {
      this.SearchValue = value
    },
    scroll (pos) {
      this.scrollY = pos.y
    },
    _initHeight () {
      this.$refs.scrollDiv.$el.style.top = `${HEIGHT}px`
      this.$refs.scrollDiv.$el.children[0].style.paddingBottom = `${HEIGHT + 60}px`
    }
  },
  watch: {
    SearchValue (newY, oldY) {
      if (!newY || newY === '') return
      getSearch(newY).then((res) => {
        this.List = []
        console.log(res, this.List)
        let list = res.data.song.list
        for (let i = 0; i < list.length; i++) {
          let obj = {}
          let data = list[i]
          obj.albummid = data.albummid
          obj.albumname = data.albumname
          obj.albumdesc = data.albumdesc
          obj.singer = SingerNameSort(data.singer)
          obj.songmid = data.songmid
          obj.interval = data.interval
          obj.songname = data.songname
          obj.time = list[i].Fupload_time
          obj.id = data.songid
          this.List.push(obj)
        }
      })
    }
  }
}
</script>
<style scoped>
  #find{
    position: fixed;
    width: 100%;
    height: 100%;
    background: #eee;
    z-index: 10;
    top: 0;
    left: 0;
  }
  .search-top{
    background: #31c27c;
    height: 40px;
    width: 100%;
    line-height: 40px;
    display: flex;
    position: relative;
    z-index: 5;
  }
  .back{
    width: 40px;
    height: 40px;
    text-align: center;
  }
  .back .icon{font-size: 20px;color: #fff}
  .search-form{
    flex: 0px 1 1;
  }
  .search-form input{
    width: 100%;
    height: 24px;
    border: none;
    background: #31c27c;
    color: #fff;
  }
  input::-webkit-input-placeholder {
    /* placeholder颜色  */
    color: #fff;
    /* placeholder字体大小  */
    font-size: 15px;
    /* placeholder位置  */
    text-align: left;
   }
  .search-keys{
    font-size: 15px;
    text-align: left;
    color: #31c27c;
    line-height: 40px;
    text-indent: 20px;
    height: 40px;
  }
  .hot-list,.history-list{
    margin: 15px 0;
    padding: 0 15px;
    text-align: left;
  }
  .history-list{padding: 0}
  .hot-list p,
  .history-list div p{font-size: 12px;margin-bottom: 5px;color: #999}
  .history-list div{padding: 0 15px}
  .hot-list li{
    float: left;
    padding:5px 10px;
    border-radius: 15px;
    margin:5px 10px 5px 0;
    border: 1px solid #999;
    font-size: 12px;
    color: #999;
  }
  .hot-list li:first-child{
    color: #31c27c;
    border-color: #31c27c;
  }
  .history-list>div{
    position: relative;
  }
  .history-list>div span{
    position: absolute;
    top: 0;
    right: 15px;
    color: #31c27c;
    font-size: 12px;
  }
  .history-list ul {
    margin-top: 10px;
  }
  .history-list li,.search-list li{
    width: 100%;
    height: 41px;
    line-height: 40px;
    border-bottom: 1px solid #ccc;
    display: flex;
    background: #fff;
    position: relative;
  }
  .history-list li p:first-child{
    flex: 0px 1 1;
    text-indent: 15px;
    font-size: 14px;
    color: #333;
  }
  .history-list li p:last-child{
    width: 40px;
    height: 40px;
  }
  .history-list .icon{color: #999}
  .search-list li{padding: 0 15px}
  .scroll{width: 100%;height: 100%;position: fixed;top: 0;left: 0;z-index: 1}
</style>
