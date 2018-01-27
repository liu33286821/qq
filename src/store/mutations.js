import * as types from './mutations-types'
const mutations = {
  [types.SET_ERROR_INFO] (state, status) {
    state.errorInfo.status = status
  },
  [types.PLAY_MUSIC_LIST] (state, music) { //歌曲播放列表
    let List = state.PlayMusicList
    const length = List.length
    if (music instanceof Array) {
      for (let i = 0; i < music.length; i++) {
        music[i].mp3Url = `http://isure.stream.qqmusic.qq.com/C100${music[i].songmid}.m4a?fromtag=32`
      }
      if (length < 1) {
        state.PlayMusicList = music
      } else {
        for (var i = 0; i < state.PlayMusicList.length; i++) {
          for (let b = 0; b < music.length; b++) {
            if (state.PlayMusicList[i].id !== music[b].id) {
              console.log(i)
            }
          }
        }
      }
      state.currentIndex = length
    } else {
      state.currentIndex = List.length - 1 < 0 ? 0 : List.length
      music.mp3Url = `http://isure.stream.qqmusic.qq.com/C100${music.songmid}.m4a?fromtag=32`
      if (List.length > 0) {
        for (let i = 0; i < List.length; i++) {
          List[i].index = i
          if (List[i].songmid === music.songmid) {
            state.currentIndex = i
            return
          }
        }
      }
      state.PlayMusicList.push(music)
    }
  },
  [types.PLAYING] (state, playing) { //播放监听
    state.playing = playing
  },
  [types.PLAY_LIST] (state, data) { //列表添加
    let playlist = state.PlayMusicList
    for (let i = 0; i < playlist.length; i++) {
      if (i.id === data.id) {
        return
      }
    }
    state.currentIndex = data.index
  },
  [types.PLAY_STATUS] (state, status) { //状态管理
    state.playing = status
  },
  [types.PLAY_MODE_NUM] (state) {  //播放模式
    state.playModeNum++
  },
  [types.CURRENT_INDEX] (state, index) { //歌曲索引更改
    state.currentIndex = index
  }
}
export default mutations
