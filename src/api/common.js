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

export function RandomList (arr) {
  //歌曲随机。 在这里不考虑把数组随机化 而是取一个当前歌曲列表长度随机数。 如果说歌曲等于当前的索引， 那么则重新进行筛选
  if (arr.length <= 1) return
  var list = []
}
export function unqiue (arr) {
  //在使用ES6 语法去重的时候。里面的object对象。 不能去除重复。  在网上查询 引用类型的问题，所以需要自己手写了
}
