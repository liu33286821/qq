**base文件夹存放的常用的小组件**
**api文件存放的一些url后面的参数和公共函数**
**components文件存放的带url的模板**


**base文件**
`error-info  未开发的功能提示的信息`
`favorite 包含了收藏  评论 分享的功能`
`index-lists 主页的列表展示`
`scroll  滚动组件`
`slider  轮播图`


**Api**
`api.js 包含了获取的url数据`
`common  包含了一些公共调用函数`
`config 包含了一些url参数的配置`


**Components**
`find  url 对照着发现`
`header  公共头部`
`index   主页`
`my  我的`
`playlist  歌单页面`
`playLintInfo  歌单详情页面`


**1月20日开发功能   歌单详情页面**
**遇见问题：**
  `页面滚动的时候 全部播放一栏会置顶`
  `解决： 把这一栏设置为公共组件 music-common-title  然后在滚动的时候判断距离顶部的位置 显示隐藏`
  `之后又碰见问题。  滚动之后  音乐列表最后一个li  高度坍塌。`
  `解决： 设置一个开关。  如果向下滚动了 就设置为true  否则就为false 然后在music-common-title 根据传递过来的开关判断是否要添加这个class`
