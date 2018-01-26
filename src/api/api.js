import axios from 'axios'
import {commonType, LyricType} from "@/api/config";

export function getPlayListInfo (disstid) {
  const url = '/api/getPlayListInfo'
  const data = Object.assign({}, commonType, {
    disstid
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch(() => {
    console.log('连接不可用了。')
  })
}

export function getPlayMusic (musicid) {
  const url = '/api/getLyric'
  const data = Object.assign({}, LyricType, {
    musicid
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch(() => {
    console.log('连接不可用了。')
  })
}
