<template>
  <div>
    <header>
      <i @click="showMenu" class="icon iconfont icon-menu"></i>
      <nav>
        <router-link to="/my">我的</router-link>
        <router-link to="/">音乐馆</router-link>
        <router-link to="/find">发现</router-link>
      </nav>
      <i class="icon iconfont icon-add" @click="showAdd"></i>
    </header>
    <div id="index-search" ref="indexSearch">
      <p><i class="icon iconfont icon-search"></i>搜索</p>
    </div>
    <div ref="setting"  @click="hideMenu" class="setting">
      <div class="setting-bg"></div>
      <div class="setting-list">
        <ul>
          <li><router-link to="/">个性装扮</router-link></li>
          <li><router-link to="/">升级VIP</router-link></li>
          <li><router-link to="/">消息中心</router-link></li>
          <li><router-link to="/">免流量服务</router-link></li>
        </ul>
        <ul>
          <li><router-link to="/">定时关闭</router-link></li>
          <li><router-link to="/">仅WI-FI联网</router-link></li>
          <li><router-link to="/">流量提醒</router-link></li>
          <li><router-link to="/">听歌偏好</router-link></li>
        </ul>
        <ul>
          <li><router-link to="/">微云音乐网盘</router-link></li>
          <li><router-link to="/">清理空间</router-link></li>
          <li><router-link to="/">帮助反馈</router-link></li>
          <li><router-link to="/">关于QQ音乐</router-link></li>
        </ul>
      </div>
    </div>
    <div class="add-setting" ref="addSetting" @click="hideAdd">
      <ul>
        <li>听歌识曲</li>
        <li>扫一扫</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {}
  },
  methods: {
    showMenu () {
      this.$refs.setting.style['transform'] = 'translate3d(0,0,0)'
    },
    hideMenu () {
      this.$refs.setting.style['transform'] = 'translate3d(-100%,0,0)'
    },
    showAdd () {
      this.$refs.addSetting.style.display = 'block'
    },
    hideAdd () {
      this.$refs.addSetting.style.display = 'none'
    }
  }
}
</script>
<style scoped>
  header{
    display: flex;
    height: 40px;
    line-height: 40px;
    background: #31c27c;
    padding: 0 40px;
  }
  header i{
    position: absolute;
    top: 0;
    color: #fff;
    font-size: 20px;
  }
  header i.icon-menu{
    left: 0;
    width: 40px;
    text-align: center;
  }
  header i.icon-add{
    right: 0;
    width: 40px;
    text-align: center;
  }
  header nav{
    flex:1;
    display: flex;
  }
  header nav a{
    flex: 1;
    color: #fff;
    text-align: center;
    transition: all .2s;
  }
  header nav a.router-link-exact-active{
    font-size: 18px;
  }
  .setting{
    transform: translate3d(-100%,0,0);
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transition: all .5s;
    z-index: 10;
  }
  .setting-bg{
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 1;
    opacity: 0;
  }
  .setting-list{
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    width: 85%;
    height: 100%;
    background: #fff;
    padding-top: 40px;
    padding-left: 20px;
    text-align: left;
    line-height: 40px;
  }
  .setting-list ul{
    margin-bottom: 30px;
  }
  #index-search{
    width: 100%;
    height: 40px;
    background: #31c27c;
    padding: 5px;
    color: #fff;
    text-align: center;
  }
  #index-search p{
    width: 100%;
    height: 30px;
    line-height: 30px;
    background: rgba(0,0,0,.1);
    border-radius: 5px;
  }
  .add-setting{
    position: fixed;
    right: 0;
    top: 0;
    background: rgba(0,0,0,0.3);
    height: 100%;
    width: 100%;
    display: none;
    z-index: 10;
  }
  .add-setting ul {
    position: absolute;
    right: 5px;
    top: 45px;
    background: #fff;
    line-height: 40px;
    height: auto;
    width: 150px;
    border-radius: 5px;
    font-size: 15px;
  }
  .add-setting li:first-child:before{
    content: '';
    border: 10px solid;
    border-color: transparent transparent #fff transparent;
    position: absolute;
    top: -19px;
    right: 5px;
  }
  .add-setting ul li:first-child{position:relative;border-bottom: 1px solid #ccc}
</style>
