import axios from 'axios'
import {type, commonParams} from "@/api/config";

export function getPlayListInfo (disstid) {
  const url = '/api/getPlayListInfo'
  const data = Object.assign({}, commonParams, {
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    g_tk: 523590146,
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log('连接不可用了。')
  })
}
