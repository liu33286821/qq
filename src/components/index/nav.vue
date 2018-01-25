<template>
    <div class="index-nav">
      <ul>
        <router-link tag="li" to="/"><i class="icon iconfont icon-user1"></i><span>歌手</span></router-link>
        <router-link tag="li" to="/"><i class="icon iconfont icon-msnui-bar-chart"></i><span>排行</span></router-link>
        <router-link tag="li" to="/"><i class="icon iconfont icon-diantai"></i><span>电台</span></router-link>
      </ul>
      <ul>
        <router-link tag="li" to="/"><i class="icon iconfont icon-fenlei"></i><span>分类菜单</span></router-link>
        <router-link tag="li" to="/"><i class="icon iconfont icon-video"></i><span>视频MV</span></router-link>
        <router-link tag="li" to="/"><i class="icon iconfont icon-zhuanjiguangpan"></i><span>数字专辑</span></router-link>
      </ul>
    </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {}
  }
}
</script>
<style scoped>
  .index-nav{
    width: 100%;
    padding: 20px 0;
  }
  .index-nav ul{display: flex;height: 24px;}
  .index-nav ul:first-child{margin-bottom: 20px}
  .index-nav li{
    flex: 1;
    text-align: left;
    color: #222;
    font-size: 0;
  }
  .index-nav li span{
    font-size: 14px;
    line-height: 24px;
    vertical-align: middle;
  }
  .icon{
    color: #31c27c;
    font-size: 24px;
    margin-right: 5%;
    vertical-align: middle;
    padding: 0 10px;
  }
</style>
