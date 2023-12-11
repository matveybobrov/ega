import isSolution from '../helpers/isSolution.js'
import { roulette } from '../helpers/roulette.js'

function generateEntity(size) {
  const arrayOfNulls = Array(size).fill(0)
  const arrayOfBinaries = arrayOfNulls.map((item) => Math.floor(Math.random() * 2))
  const entity = arrayOfBinaries.join('')
  return entity
}

export function generatePopulationRandomly(data) {
  const population = []
  const size = data.length

  for (let i = 0; i < size; i++) {
    const entity = generateEntity(size)
    if (population.includes(entity)) {
      i--
      continue
    }
    population.push(entity)
  }
  return population
}

export function generateControlledRandomPopulation(data, maxWeight) {
  const population = []
  const size = data.length

  for (let i = 0; i < size; i++) {
    const entity = generateEntity(size)
    if (
      !isSolution(entity, data, maxWeight) ||
      Number(entity) == 0 ||
      population.includes(entity)
    ) {
      i--
      continue
    }
    population.push(entity)
  }
  return population
}

function generatePopulationByRoulette(data) {}
