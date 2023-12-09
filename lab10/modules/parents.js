export function getRandomParents(population) {
  const parents = []
  while (parents.length < 2) {
    const randomIndex = Math.floor(Math.random() * population.length)
    const parent = population[randomIndex]
    if (!parents.includes(parent)) {
      parents.push(parent)
    }
  }
  return parents
}
