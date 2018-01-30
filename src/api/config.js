//公共属性
const type = {
  type: 1,
  json: 1,
  utf8: 1,
  onlysong: 0,
  loginUin: '33286821',
  hostUin: 0,
  platform: 'yqq',
  format: 'json',
  needNewCode: 0
}
const commonParams = {
  g_tk: 523590146,
  format: 'jsonp',
  inCharset: 'utf8',
  outCharset: 'utf-8',
  notice: 0
}
export const commonType = Object.assign({}, commonParams, type)

export const options = {
  param: 'jsonpCallback'
}
//歌曲属性
export const SongMusic = {
  guid: 1297949334,
  vkey: '1959F5565F7B7AB008D3C561A4FDE653E53018555158B29AFEB5E9417223A549150E7187B62B2061053A0B767D8D648B426A3CF46A120D07',
  uin: '',
  fromtag: '999'
}
//https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?
// g_tk=1836039232
// uin=33286821
// format=json
// inCharset=utf-8
// outCharset=utf-8
// notice=0
// platform=h5
// needNewCode=1
// tpl=3
// page=detail
// type=top
// topid=4
// _=1517295315284


