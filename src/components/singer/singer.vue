<template>
    <div id="singer">
      <div id="singer-top">
        <div class="back" @click="goBack"><i class="icon iconfont icon-xiangzuo"></i></div>
        <div class="st-title">歌手列表</div>
        <div class="singer-search"><i class="icon iconfont icon-search"></i></div>
      </div>
      <ul id="fixed-num" ref="fixedNum"
          @touchstart.stop.pervent="onTouchStart"
          @touchmove.stop.pervent="onTouchMove"
          @touchend.stop.pervent>
        <li v-for="(item, index) in SingerSort" :class="{'active':currentIndex == index}"  :data-index="index">{{item}}</li>
      </ul>
      <h2 id="singer-title">{{SingerTitle}}</h2>
      <div class="singer-scontent">
        <scroll id="singer-scroll"
                :listen-scroll="listenScroll"
                :probeType="probeType"
                :data="Singer"
                @scroll="scroll"
                ref="listview"
        >
          <ul ref="SingerScroll">
            <li v-for="(item,index) in Singer">
              <ul class="singer-list">
                <li v-for="i in item.item" @click="SingerDetail(i.Fsinger_id)">
                  <div class="singer-image"><img v-lazy="i.images"/></div>
                  <div class="singer-name"><p>{{i.Fsinger_name}}</p></div>
                </li>
              </ul>
            </li>
          </ul>
        </scroll>
      </div>
      <transition name="singerDetail">
        <router-view></router-view>
      </transition>
    </div>
</template>

<script>
import {getSinger} from '@/api/api'
import Scroll from '../../base/scroll/scroll.vue'
const ANCHOR_HEIGHT = 20
export default {
  components: {Scroll},
  name: 'singer',
  data () {
    return {
      Singer: [],
      SingerSort: [],
      scrollY: -1,
      currentIndex: 0,
      SingerTitle: '热门'
    }
  },
  created () {
    this.getSinger()
    this.listenScroll = true
    this.probeType = 3
    this.touches = {}
    this.listHeight = []
  },
  mounted () {
    this.clientHeight()
    this._listHeightSort()
  },
  updated () {
    this._listHeightSort()
  },
  methods: {
    getSinger () {
      getSinger().then((res) => {
        this.SingerSort = this.setSingerIndex(res.data.list)
        this.Singer = this.setSingerList(res.data.list)
      })
    },
    setSingerIndex (data) {
      if (data.length < 1) {
        return
      }
      let arr1 = [] //先保存所有的字母
      data.forEach((v, i) => {
        arr1.push(v.Findex)
      })
      return Array.sort(Array.from(new Set(arr1))) //渲染出去 不过这个只是右边的索引
    },
    setSingerList (data) {
      let arr2 = []
      for (let i = 0; i < this.SingerSort.length; i++) {
        let obj = {
          title: this.SingerSort[i],
          item: []
        }
        arr2.push(obj)
      }
      for (let i = 0; i < data.length; i++) {
        data[i].images = `http://y.gtimg.cn/music/photo_new/T001R150x150M000${data[i].Fsinger_mid}.jpg?max_age=2592000`
        for (let b = 0; b < arr2.length; b++) {
          if (data[i].Findex === arr2[b].title) {
            arr2[b].item.push(data[i])
          }
        }
      }
      return arr2
    },
    scroll (pos) {
      this.scrollY = pos.y
    },
    clientHeight () {
      this.$refs.SingerScroll.style.paddingBottom = `120px`
    },
    onTouchStart (e) { //触摸右边的滑动。 获取目标的位置
      let index = this.getDataType(e.target, 'index')
      let firstTouch = e.touches[0]
      this.touches.y1 = firstTouch.pageY
      this.touches.index = index
      this._scrollTo(index)
    },
    onTouchMove (e) {
      let firstTouch = e.touches[0]  //触摸移动的时候 发生变化
      this.touches.y2 = firstTouch.pageY
      let delta = (this.touches.y2 - this.touches.y1) / ANCHOR_HEIGHT || 0
      let index = parseInt(this.touches.index)  + delta
      this._scrollTo(index)
    },
    getDataType (e, type, val) {
      let typeName = 'data-'
      if (val) {
        return e.setAttribute(typeName + type, val)
      } else {
        return e.getAttribute(typeName + type)
      }
    },
    _scrollTo (index) {
      if (!index && index !== 0) {
        return
      }
      if (index < 0) {
        index = 0
      } else if (index > this.SingerSort.length - 1) {
        index = this.SingerSort - 1
      }
      this.scrollY = -this.listHeight[index]
      this.currentIndex = index
      this.$refs.listview.scrollToElement(this.$refs.SingerScroll.children[index], 0)
    },
    _listHeightSort () {
      /*
      * 一开始数组没清空。  会一直添加。  后期考虑在里面先把数组清空
      * */
      this.listHeight = []
      let children = this.$refs.SingerScroll.children
      for (let i = 0; i < children.length; i++) {
        this.listHeight.push(children[i].offsetTop)
      }
    },
    refresh () {
      this.$refs.listview.refresh()
    },
    SingerDetail (id) {
      this.$router.push('/singer/' + id)
    },
    goBack () {
      this.$router.go(-1)
    }
  },
  watch: {
    scrollY (newY, oldY) {
      const listHeight = this.listHeight
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i
          this.SingerTitle = this.Singer[i].title
          return
        }
      }
      // 当滚动到底部，且-newY大于最后一个元素的上限
      this.currentIndex = listHeight.length - 1
      this.SingerTitle = this.Singer[this.currentIndex].title
    }
  }
}
</script>
<style scoped>
  #singer{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #fff;
  }
  #singer-top{
    width: 100%;
    height: 40px;
    line-height: 40px;
    position: relative;
    z-index: 10;
    background: #31c27c;
    color: #fff;
    display: flex;
  }
  #singer-top .icon {
    font-size: 20px;
  }
  .back{
    width: 40px;
    height: 40px;
    float: left;
  }
  .singer-search {
    width: 40px;
    height: 40px;
    float: right;
  }
  #fixed-num{
    width: 20px;
    height: auto;
    position:fixed;
    top: 50%;
    right: 20px;
    transform: translate(0,-50%);
    background: #cccccc;
    border-radius: 10px;
    color: #555;
    padding: 10px 0;
    z-index: 1;
  }
  #fixed-num li{
    line-height: 20px;
    height: 20px;
  }
  #fixed-num li.active{color: #31c27c}
  .singer-scontent,#singer-scroll{
    width: 100%;
    height: 100%;
  }
  #singer-title {
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    background: #eee;
    position: relative;
    z-index: 1;
  }
  .singer-list li {
    width: 100%;
    height: 50px;
    line-height: 40px;
    display: flex;
  }
  .singer-list li div:first-child{
    width: 50px;
    height: 50px;
    padding:5px;
  }
  .singer-list li img{width: 100%;height: 100%;border-radius: 50%;}
  .singer-list li div:last-child{
    flex: 0 1 100%;
    text-align: left;
    border-bottom: 1px solid #eee;
    padding:10px 0;
    text-indent: 10px;
  }
  .st-title{
    flex: 0px 1 1;
  }
  .singerDetail-enter-active,.singerDetail-leave-active {
    transition: all .5s;
  }
  .singerDetail-enter,.singerDetail-leave-to {
    transform:translate3d(100%,0,0);
  }
</style>
