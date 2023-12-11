import { roulette } from '../helpers/roulette.js'

// Панмиксия (случайные родители)
function getRandomParents(population) {
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

// Положительное ассоциативное скрещивание (рулетка)
function getParentsByAdaptation(population) {
  const parents = []
  const values = population.map((item) => item.adaptation)
  const ids = roulette(values, 2)
  ids.forEach((id) => {
    parents.push(population[id])
  })
  return parents
}

export default { getRandomParents, getParentsByAdaptation }
