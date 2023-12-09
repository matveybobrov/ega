export default function getAdaptation(codes, data) {
  const values = data.map((item) => item.value)
  const entities = []
  codes.forEach((code) => {
    const adaptation = values
      .filter((v, i) => code[i] == '1')
      .reduce((prev, curr) => prev + curr, 0)
    entities.push({
      code,
      adaptation,
    })
  })
  return entities
}
