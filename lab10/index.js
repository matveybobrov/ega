import { getArrayFromFile, printData } from './helpers/handleData.js'

import { generateControlledRandomPopulation } from './modules/initialPopulation.js'
import { getRandomParents } from './modules/parents.js'
import { crossover } from './modules/crossover.js'
import { mutate } from './modules/mutate.js'
import { selection } from './modules/selection.js'
import getAdaptation from './helpers/getAdaptation.js'

const DATA = getArrayFromFile('assets/table5.txt')
const MAX_WEIGHT = 75
printData(DATA)

// Этап 1 - создание популяции
let INITIAL_POPULATION = generateControlledRandomPopulation(DATA, MAX_WEIGHT)
INITIAL_POPULATION = getAdaptation(INITIAL_POPULATION, DATA)
let CURRENT_POPULATION = INITIAL_POPULATION

let NEW_POPULATIONS_COUNT = 0
do {
  console.log('Номер поколения: ', 1 + NEW_POPULATIONS_COUNT)
  console.log('Текущая популяция:')
  console.log(CURRENT_POPULATION)
  // Этап 2 - формирование детей
  // сейчас дети могут повторяться и быть пустыми
  let CHILDREN = []
  for (let i = 0; i < CURRENT_POPULATION.length / 2; i++) {
    const parents = getRandomParents(CURRENT_POPULATION)
    let children = crossover(parents)
    children = getAdaptation(children, DATA)
    CHILDREN = [...CHILDREN, ...children]
  }
  console.log('Все дети:')
  console.log(CHILDREN)

  // Этап 3 - мутация детей
  console.log('Мутанты')
  let MUTANTS = mutate(CHILDREN)
  MUTANTS = getAdaptation(MUTANTS, DATA)
  console.log(MUTANTS)

  // Этап 4 - оценивание
  console.log('Отобранные кандидаты')
  const SELECTED = selection(MUTANTS, DATA, MAX_WEIGHT)
  console.log(SELECTED)

  // Этап 5 - фомирование нового поколения
  console.log('Новое поколение')
  const NEW_POPULATION = SELECTED
  console.log(NEW_POPULATION)
  // Условие остановки - суммарная приспособленность не увеличивается 5 поколений подряд

  CURRENT_POPULATION = NEW_POPULATION
  NEW_POPULATIONS_COUNT++
  console.log('\n')
} while (NEW_POPULATIONS_COUNT < 5)

console.log('Финальное решение')
console.log(CURRENT_POPULATION)
