import * as types from './mutations-types'
const mutations = {
  [types.SET_ERROR_INFO] (state, status) {
    state.errorInfo.status = status
  },
  [types.PLAY_MUSIC_LIST] (state, music) { //歌曲播放列表
    let List = state.PlayMusicList
    state.currentIndex = List.length - 1 < 0 ? 0 : List.length
    music.mp3Url = `http://dl.stream.qqmusic.qq.com/C400${music.songmid}.m4a?guid=1297949334&vkey=FAB9EA2783E226687F5C8F140DCD56D6E30036DE03C41EBCC58EE79BC184AE35CCDEBFCB3CACB3B465CB764F2DFF42A4878E753CEDBECA0C&uin=&fromtag=999`
    console.log(state.currentIndex)
    if (List.length > 0) {
      for (let i = 0; i < List.length; i++) {
        List[i].index = i
        if (List[i].songmid === music.songmid) {
          state.currentIndex = i
          return false
        }
      }
    }
    state.PlayMusicList.push(music)
  },
  [types.PLAYING] (state, playing) {
    console.log(playing)
    state.playing = playing
  },
  [types.PLAY_LIST] (state, data) {
    let playlist = state.PlayMusicList
    for (let i = 0; i < playlist.length; i++) {
      if (i.id === data.id) {
        return
      }
    }
    console.log('bu dengyu')
    state.currentIndex = data.index
  }
}
export default mutations
