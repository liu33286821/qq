**base文件夹存放的常用的小组件**
**api文件存放的一些url后面的参数和公共函数**
**components文件存放的带url的模板**


**base文件**
  > * error-info  未开发的功能提示的信息
  > * favorite 包含了收藏  评论 分享的功能
  > * index-lists 主页的列表展示
  > * scroll  滚动组件
  > * slider  轮播图


**Api**
  > * api.js 包含了获取的url数据
  > * common  包含了一些公共调用函数
  > * config 包含了一些url参数的配置


**Components**
  > * find  url 对照着发现
  > * header  公共头部
  > * index   主页
  > * my  我的
  > * playlist  歌单页面
  > * playLintInfo  歌单详情页面


###1月20日开发功能   歌单详情页面
**遇见问题：**
  > * 页面滚动的时候 全部播放一栏会置顶
  > * 解决： 把这一栏设置为公共组件 music-common-title  然后在滚动的时候判断距离顶部的位置 显示隐藏`
  > * 之后又碰见问题。  滚动之后  音乐列表最后一个li  高度坍塌。`
  > * 解决： 设置一个开关。  如果向下滚动了 就设置为true  否则就为false 然后在music-common-title 根据传递过来的开关判断是否要添加这个class`
  
###1月22日开发功能
**遇见问题**
  > * 使用ES6的for of方法和forEach循环数组 第一个方法不能获取索引 第二个方法不能跳出循环 然后使用常规的for来进行循环`
  > * 修复歌单详情页面滚动问题。  上拉下拉的时候 还是会有一些不自然。

**1月23日开发功能**
  > * 歌曲播放  歌曲播放列表

###1月24日开发
**遇见问题**
 > * 碰见本地配置，然后用IP地址访问不了的问题。
 - [x] 解决：在 config/index 下面把host文件改成自己的IP地址。
 > * 碰见获取歌曲时间的问题  
 - [x] 参考了W3C文档里面的 ontimeupdate 方法。  这个方法是在歌曲当前位置播放发生改变的时候进行调用，所以在audio 上面绑定了一个事件，来进行获取事件，随之更改属性事件
 > * 歌词问题。  参考了网上所说的 lyric-parser 来解析歌词。
 - [x] 详细方法可以去百度搜索使用方法
