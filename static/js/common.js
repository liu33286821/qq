export function formatNum (str) {
  let str2 = str + ''
  var re = /(?=(?!(\b))(\d{3})+$)/g
  return str2.replace(re, ',')
  // return str2.split('').reverse().join('')
  //   .replace(/([0-9]{3})/g, '$1,').split('').reverse().join('')
}
