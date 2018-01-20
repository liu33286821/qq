import * as types from './mutations-types'
const mutations = {
  [types.SET_ERROR_INFO] (state, status) {
    state.errorInfo.status = status
  },
  [types.PLAY_MUSIC_LIST] (state, music) {
    console.log(state.PlayMusicList, music)
    state.PlayMusicList.push(music)
  }
}
export default mutations
