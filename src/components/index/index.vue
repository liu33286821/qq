<template>
  <div class="index">
    <scroll class="scroll" ref="scroll" :data="CarouselList">
      <div ref="scrollChildren">
        <slider class="slider-wrapper"  v-if="CarouselList.length">
          <div v-for="item in CarouselList" class="slider-item">
            <a href="javascript:;">
              <img :src="item.pic_info.url"/>
            </a>
          </div>
        </slider>
        <index-nav></index-nav>
        <index-list :lists="recomPlayList" @playListInfo="getPlayListInfo"></index-list>
      </div>
    </scroll>
  </div>
</template>

<script type="es6">
import axios from 'axios'
import {getPlayListInfo} from '@/api/api'
import Scroll from '@/base/scroll/scroll'
import Slider from '@/base/slider/slider'
import IndexNav from '@/components/index/nav'
import IndexList from '@/base/index-lists/index-list'
import {mapMutations} from 'vuex'
const OFFSET_TOP = 80
export default {
  name: '',
  data () {
    return {
      CarouselList: [],
      recomPlayList: {
        title: '新歌推荐',
        list: []
      }
    }
  },
  components: {Slider, Scroll, IndexNav, IndexList},
  created () {
    this.getIndex()
  },
  mounted () {
    this.ScrollHeight()
  },
  methods: {
    getIndex () {
      axios.get('api/getIndex').then((res) => {
        var ret = res.data
        var ret2 = ret.split('recom5752458640957665(')[1]
        var str = ret2.substr(0, ret2.length - 1)
        var Data = JSON.parse(str)
        this.CarouselList = Data.focus.data.content
        var recomPlayList = Data.recomPlaylist.data.v_hot.slice(0, 6)
        this.recomPlayList.list = recomPlayList
      })
    },
    ScrollHeight () {
      this.$refs.scrollChildren.style.paddingBottom = `${OFFSET_TOP}px`
    },
    getPlayListInfo (id) {
      this.$router.push({path: `playlist/${id}`})
    }
  }
}
</script>
<style scoped>
  .index{
    position: fixed;
    top: 80px;
    width: 100%;
    height: 100%;
    bottom: 0
  }
  .scroll{
    height: 100%;
    overflow: hidden;
  }
  .slider-wrapper{
    position: relative;
    width: 100%;
  }
  .scroll>div{display: block}
</style>
