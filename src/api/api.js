import axios from 'axios'
import {commonType, SongMusic} from "@/api/config";

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
export function getMusic (id) {
  const url = `/api/music/${id}`
  const data = Object.assign({}, SongMusic)
  console.log(url)
  axios.get(url, {
    params: data
  }).then(function (res) {
    console.log(res)
  })
}
