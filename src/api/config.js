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

//歌手列表页面
const Singer = {
  channel: 'singer',
  page: 'list',
  key: 'all_all_all',
  pagesize: 100,
  pagenum: 1
}
export const CommonSinger = Object.assign({}, Singer, commonParams)

const SingerDetailType = {
  num: 200,
  begin: 0,
  order: 'listen',
  platform: 'h5page',
  _: 1517626923128
}
export const SingerDetail = Object.assign({}, commonType, SingerDetailType)

const SearchType = {
  zhidaqu: 1,
  catZhida: 1,
  t: 0,
  flag: 1,
  ie: 'utf-8',
  sem: 1,
  aggr: 0,
  perpage: 20,
  n: 20,
  remoteplace: 'txt.mqq.all',
  _: 1517642453934
}
export const Search = Object.assign({}, commonType, SearchType)
