export function SingerNameSort (arr) {  //歌手名字组合
  if (!arr.length) return
  var singer = []
  arr.forEach((item) => {
    singer.push(item.name)
  })
  if (!singer) return '佚名'
  if (singer.length > 1) {
    return singer.join(' / ')
  }
  return singer[0]
}
