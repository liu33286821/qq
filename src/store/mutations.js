import * as types from './mutations-types'
const mutations = {
  [types.SET_ERROR_INFO] (state, status) {
    state.errorInfo.status = status
  },
  [types.PLAY_MUSIC_LIST] (state, music) { //歌曲播放列表
    let List = state.PlayMusicList
    state.currentIndex = List.length - 1 < 0 ? 0 : List.length
    music.mp3Url = `http://dl.stream.qqmusic.qq.com/C400${music.songmid}.m4a?guid=1297949334&vkey=746AFE5A498486A1B7B45D1DA425B1E658F6825554A97AAC3A465C7451404B95C7F3DE8ECDC5E21A9D9888EB86287AD8FE94B752B811A47C&uin=&fromtag=999`
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
  [types.PLAYING] (state, playing) { //播放监听
    state.playing = playing
  },
  [types.PLAY_LIST] (state, data) {
    let playlist = state.PlayMusicList
    for (let i = 0; i < playlist.length; i++) {
      if (i.id === data.id) {
        return
      }
    }
    state.currentIndex = data.index
  },
  [types.PLAY_STATUS] (state, status) {
    state.playing = status
  },
  [types.PLAY_MODE_NUM] (state) {
    state.playModeNum++
    console.log(state.playModeNum)
  }
}
export default mutations
