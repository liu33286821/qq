<template>
    <div class="index-list">
      <div class="index-list-title">{{lists.title}}<router-link to="/playlist" class="icon iconfont icon-more_circle"></router-link></div>
      <div id="index-lists">
        <ul class="clearfix">
          <li v-for="item in lists.list" @click="getInfo(item.content_id)">
            <div>
              <music-common-image :Image="item.cover" :newImage="item.edge_mark"></music-common-image>
            </div>
            <p class="list-title" v-html="item.title"></p>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import Scroll from '@/base/scroll/scroll.vue'
import MusicCommonImage from '@/base/music-common-image/music-common-image'
export default {
  components: {Scroll, MusicCommonImage},
  props: {
    lists: {  //从父组件传递过来的值
      type: Object,
      default: null
    }
  },
  methods: {
    getInfo (id) {
      this.$emit('playListInfo', id)
    }
  }
}
</script>
<style scoped>
  .index-list-title{
    line-height: 40px;
    padding-bottom: 10px;
  }
  .icon-more_circle{
    float: right;
    font-size: 20px;
    right: 10px;
    position: relative;
  }
  #index-lists ul{
    padding: 0 10px;
  }
  #index-lists li{
    width: 33.3%;
    height: auto;
    float: left;
    position: relative;
    font-size: 14px;
    margin-bottom: 10px;
  }
  #index-lists li:nth-child(3n) .list-cover{
    border-right: none;
  }
  #index-lists li .list-cover{
    width: 100%;
    height:auto;
    border-right: 1px solid #fff;
  }
  .edge_mark{
    position: absolute;
    left: 0;
    top: 0;
  }
  .list-title{
    width:100%;
    word-break:break-all;
    display:-webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient:vertical;
    overflow:hidden;
    line-height: 24px;
    height: 48px;
    text-align: left;
  }
</style>
