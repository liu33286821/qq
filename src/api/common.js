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

export function unqiueObject (array, keys) {
  //在使用ES6 语法去重的时候。里面的object对象。 不能去除重复。  在网上查询 引用类型的问题，所以需要自己手写了
  var arr = []
  var hash = {}
  for (let i = 0; i < array.length; i++) {
    var k = unqiueObjectKeysStr(array[i], keys)
    if (!(k in hash)) {
      hash[k] = true
      arr.push(array[i])
    }
  }
  return arr
}

function unqiueObjectKeysStr (obj, keys) {
  var n = keys.length,
    key = []
  while (n--) {
    key.push(obj[keys[n]])
  }
  return key.join('|')
}

/*
* 歌曲热度 百分比
* */

export function percentum (str) {
  var num = Math.ceil(Number(str).toFixed(2) * 100)
  return `${num}%`
}
