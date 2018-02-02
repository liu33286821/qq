<template>
    <div id="singer">
      <div id="singer-top">
        <div class="back"><i class="icon iconfont icon-xiangzuo"></i></div>
        <div class="singer-search"><i class="icon iconfont icon-search"></i></div>
      </div>
      <h2></h2>
      <ul id="fixed-num" ref="fixedNum"
          @touchstart.stop.pervent="onTouchStart"
          @touchmove.stop.pervent="onTouchMove"
          @touchend.stop.pervent>
        <li v-for="(item, index) in SingerSort" :class="{'active':currentIndex == index}"  :data-index="index">{{item}}</li>
      </ul>
      <h2 id="singer-title">热门</h2>
      <div class="singer-scontent">
        <scroll id="singer-scroll"
                :listen-scroll="listenScroll"
                :probeType="probeType"
                :data="Singer"
                ref="listview"
        >
          <ul ref="SingerScroll">
            <li v-for="(item,index) in Singer">
              <ul class="singer-list">
                <li v-for="i in item.item">{{i.Fsinger_name}}</li>
              </ul>
            </li>
          </ul>
        </scroll>
      </div>
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
      scrollY: 0,
      currentIndex: 0
    }
  },
  created () {
    this.getSinger()
    this.listenScroll = true
    this.probeType = 3
    this.scroll = {}
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
      this.touches.init = true
      let firstTouch = e.touches[0]
      this.touches.y1 = firstTouch.pageY
      this.touches.index = index
      this._scrollTo(index)
    },
    onTouchMove (e) {
      let firstTouch = e.touches[0]  //触摸移动的时候 发生变化
      this.touches.y2 = firstTouch.pageY
      let delta = (this.touches.y2 - this.touches.y1) / ANCHOR_HEIGHT || 0
      console.log(this.touches.y2, this.touches.y1)
      let index = parseInt(this.touches.index + delta)
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
      console.log( this.currentIndex )
    },
    _listHeightSort () {
      let children = this.$refs.SingerScroll.children
      for (let i = 0; i < children.length; i++) {
        this.listHeight.push(children[i].offsetTop)
      }
    },
    refresh () {
      this.$refs.listview.refresh()
    },
  },
  watch: {
    scrollY (newY, oldY) {

    },
    data () {
      setTimeout(() => {
        this._listHeightSort()
      },50)
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

</style>
