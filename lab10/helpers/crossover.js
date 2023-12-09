export function crossover(parents) {
  let breakPoint = Math.ceil(parents.length / 2)

  const child1 =
    parents[0].slice(0, breakPoint + 1) + parents[1].slice(breakPoint + 1, parents[0].length)
  const child2 =
    parents[1].slice(0, breakPoint + 1) + parents[0].slice(breakPoint + 1, parents[0].length)
  return [child1, child2]
}
