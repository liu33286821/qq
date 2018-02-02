import axios from 'axios'
import {commonType,CommonSinger} from "@/api/config";

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

export function getTopList () {
  const url = '/api/getTopList'
  const data = Object.assign({}, commonType)
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch(() => {
    console.log('连接不可用了。')
  })
}

export function getTopListInfo (id) {
  const url = `/api/getTopList/${id}`
  const data = Object.assign({}, commonType, {
    type: 'top',
    tpl: 3,
    topid: id
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSinger () {
  let data = CommonSinger
  const url = '/api/getSinger'
  return axios.get(url,{
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
