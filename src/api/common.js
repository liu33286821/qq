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

/*
* 上拉加载 高度不同
* */
export function getDeviceRatio () {
  const isAndroid = window.navigator.appVersion.match(/android/gi)
  const isIPhone = window.navigator.appVersion.match(/iphone/gi)
  const devicePixelRatio = window.devicePixelRatio
  let dpr
  if (isIPhone) {
    // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
    if (devicePixelRatio >= 3) {
      dpr = 3
    } else if (devicePixelRatio >= 2) {
      dpr = 2
    } else {
      dpr = 1
    }
  } else {
    // 其他设备下，仍旧使用1倍的方案
    dpr = 1
  }
  return dpr
}
