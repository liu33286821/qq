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
  vkey: '4FE3C29F4ADE9E8CE10611582D18D708022F2214F972D978D10D93676E065ED38E99C2509E5722D890B6D198AFA034D11ED8091298C93C30',
  uin: '',
  fromtag: '999'
}
