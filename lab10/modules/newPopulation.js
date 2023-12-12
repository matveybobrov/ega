export function newPopulation(currentPopulation, children) {
  const newPopulation = [...children]
  while (newPopulation.length < currentPopulation.length) {
    const randomId = Math.floor(Math.random() * currentPopulation.length)
    const chosenEntity = currentPopulation[randomId]
    newPopulation.push(chosenEntity)
  }
  return newPopulation
}
