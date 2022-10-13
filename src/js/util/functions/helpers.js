export function mod(divident, divisor) {
  return ((divident % divisor) + divisor) % divisor
}

export function union(set1, set2) {
  return new Set([...set1, ...set2])
}

export function intersection(set1, set2) {
  return new Set([...set1].filter(element => set2.has(element)))
}
