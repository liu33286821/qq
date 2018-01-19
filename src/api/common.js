export function formatNum (str) {
  let str2 = str + ''
  return str2.split('').reverse().join('')
    .replace(/([0-9]{3})/g, '$1,').split('').reverse().join('')
}
