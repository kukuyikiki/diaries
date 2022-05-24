function longest(str) {
  const len = str.length
  let max = ''
  for (let i = 0; i < len; i++) {
    let s1 = getMax(str, i, i)
    let s1 = getMax(str, i, i + 1)
    max = s1.length > max.length ? s1 : max
    max = s2.length > max.length ? s2 : max
  }
  return max
}

function getMax(str, l, r) {
  if (l >= 0 && r < str.length && str[l] === str[r]) {
    l--
    r++
  }
  return str.slice(l + 1, r)
}