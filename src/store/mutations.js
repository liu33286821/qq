import * as types from './mutations-types'
const mutations = {
  [types.SET_ERROR_INFO] (state, status) {
    state.errorInfo.status = status
  },
  [types.PLAY_MUSIC_LIST] (state, music) {
    let List = state.PlayMusicList
    state.currentIndex = List.length - 1 < 0 ? 0 : List.length
    music.mp3Url = `http://dl.stream.qqmusic.qq.com/C400${music.songmid}.m4a?guid=1297949334&vkey=1959F5565F7B7AB008D3C561A4FDE653E53018555158B29AFEB5E9417223A549150E7187B62B2061053A0B767D8D648B426A3CF46A120D07&uin=&fromtag=999`
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
  }
}
export default mutations
