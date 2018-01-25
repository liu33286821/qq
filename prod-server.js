var express= require('express')
var config = require('./config/index')
const app = express()
const axios = require('axios')
var apiRoutes = express.Router()
app.use('/api',apiRoutes)
const apiUrl = 'https://c.y.qq.com/'

app.get('/api/getCarousel',function (req,res) {
  var url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  axios.get(url).then((response) => {
    res.json(response.data)
  }).catch((error) => {
    res.json({
      code: '404',
      info: 'url不可取'
    })
  })
}),
  app.get('/api/getIndex',function (req,res) {
    var url = 'https://u.y.qq.com/cgi-bin/musicu.fcg?callback=recom5752458640957665&g_tk=204660919&jsonpCallback=recom5752458640957665&loginUin=33286821&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22category%22%3A%7B%22method%22%3A%22get_hot_category%22%2C%22param%22%3A%7B%22qq%22%3A%22%22%7D%2C%22module%22%3A%22music.web_category_svr%22%7D%2C%22recomPlaylist%22%3A%7B%22method%22%3A%22get_hot_recommend%22%2C%22param%22%3A%7B%22async%22%3A1%2C%22cmd%22%3A2%7D%2C%22module%22%3A%22playlist.HotRecommendServer%22%7D%2C%22playlist%22%3A%7B%22method%22%3A%22get_playlist_by_category%22%2C%22param%22%3A%7B%22id%22%3A8%2C%22curPage%22%3A1%2C%22size%22%3A40%2C%22order%22%3A5%2C%22titleid%22%3A8%7D%2C%22module%22%3A%22playlist.PlayListPlazaServer%22%7D%2C%22new_song%22%3A%7B%22module%22%3A%22QQMusic.MusichallServer%22%2C%22method%22%3A%22GetNewSong%22%2C%22param%22%3A%7B%22type%22%3A0%7D%7D%2C%22new_album%22%3A%7B%22module%22%3A%22QQMusic.MusichallServer%22%2C%22method%22%3A%22GetNewAlbum%22%2C%22param%22%3A%7B%22type%22%3A0%2C%22category%22%3A%22-1%22%2C%22genre%22%3A0%2C%22year%22%3A1%2C%22company%22%3A-1%2C%22sort%22%3A1%2C%22start%22%3A0%2C%22end%22%3A39%7D%7D%2C%22toplist%22%3A%7B%22module%22%3A%22music.web_toplist_svr%22%2C%22method%22%3A%22get_toplist_index%22%2C%22param%22%3A%7B%7D%7D%2C%22focus%22%3A%7B%22module%22%3A%22QQMusic.MusichallServer%22%2C%22method%22%3A%22GetFocus%22%2C%22param%22%3A%7B%7D%7D%7D'
    axios.get(url).then((response) => {
      var ret = response.data
      if(typeof response.data == 'string') {
        var reg = /^\w+\(({[^()]+})\)$/
        var matches = ret.match(reg)
        if (matches) {
          ret = JSON.parse(matches[1])
        }
      }
      res.json(ret)
    }).catch((error) => {
      res.json({
        code: 404,
        info: '地址过期'
      })
    })
  }),
  app.get('/api/getPlayListInfo',function (req,res) {
    let url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg';
    let refer = `https://y.qq.com/n/yqq/playlist/${req.query.disstid}.html`
    axios.get(url, {
      headers: {
        referer: refer,
        host: 'c.y.qq.com'
      },
      params: req.query
    }).then((response) => {
      res.json(response.data)
    }).catch((error) => {
      console.log(error)
    })
  })

app.use(express.static('./dist')) //静态资源入口
var port =process.env.PORT || config.build.port
module.exports = app.listen(port,function (err) {
  console.log('http://localhost:'+port)
})

