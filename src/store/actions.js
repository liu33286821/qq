import * as types from './mutations-types'
export const Undeveloped = function ({commit}, {status}) {  //暂未开发功能
  commit(types.SET_ERROR_INFO, status)
  setTimeout(() => {
    commit(types.SET_ERROR_INFO, false)
  }, 1500)
}
export const PlayMusicList = function ({commit}, {music, playing}) { //歌曲播放列表
  commit(types.PLAY_MUSIC_LIST, music)
  commit(types.PLAYING, playing)
}
export const PlayMusic = function ({commit}, {index, id}) {  //播放音乐
  commit(types.PLAY_LIST, {index, id})
}
