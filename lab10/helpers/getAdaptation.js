export default function getAdaptationAndWeight(codes, data) {
  const values = data.map((item) => item.value)
  const weights = data.map((item) => item.weight)
  const entities = []
  codes.forEach((code, id) => {
    const adaptation = values
      .filter((v, i) => code[i] == '1')
      .reduce((prev, curr) => prev + curr, 0)
    const weight = weights.filter((v, i) => code[i] == '1').reduce((prev, curr) => prev + curr, 0)
    entities.push({
      id,
      code,
      adaptation,
      weight,
    })
  })
  return entities
}
