export function crossover(parents) {
  let breakPoint = Math.ceil(parents.length / 2)
  let parentsCodes = parents.map((parent) => parent.code)

  const child1 =
    parentsCodes[0].slice(0, breakPoint + 1) +
    parentsCodes[1].slice(breakPoint + 1, parentsCodes[0].length)
  const child2 =
    parentsCodes[1].slice(0, breakPoint + 1) +
    parentsCodes[0].slice(breakPoint + 1, parentsCodes[0].length)
  return [child1, child2]
}
