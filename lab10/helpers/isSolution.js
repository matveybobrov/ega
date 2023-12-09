function isSolution(entity, data, maxWeight) {
  const size = data.length
  const weights = data.map((item) => item.weight)

  const entityWeight = weights
    .filter((w, i) => entity[i] == '1')
    .reduce((acc, curr) => acc + curr, 0)

  if (entityWeight <= maxWeight) {
    return true
  }
  return false
}

export default isSolution
