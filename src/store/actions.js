import * as types from './mutations-types'
export const Undeveloped = function ({commit}, {status}) {  //暂未开发功能
  commit(types.SET_ERROR_INFO, status)
  setTimeout(() => {
    commit(types.SET_ERROR_INFO, false)
  }, 1500)
}
export const PlayMusicList = function ({commit}, {music}) {
  commit(types.PLAY_MUSIC_LIST, music)
}
