import * as types from './mutations-types'
import {getPlayListInfo} from '@/api/api'
const mutations = {
  [types.SET_PLAY_LIST_INFO] (state, info) {
    state.PlayListInfo = info
  }
}

export default mutations
