export default function getWeight(codes, data) {
  const weights = data.map((item) => item.weight)
  const entities = []
  codes.forEach((code, id) => {
    const weight = weights.filter((v, i) => code[i] == '1').reduce((prev, curr) => prev + curr, 0)
    entities.push({
      id,
      code,
      weight,
    })
  })
  return entities
}
