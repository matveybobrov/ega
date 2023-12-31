import { getArrayFromFile, printData } from './helpers/handleData.js'
import getAdaptationAndWeight from './helpers/getAdaptation.js'
import findBestEntity from './helpers/findBestEntity.js'

import { generateControlledRandomPopulation } from './modules/initialPopulation.js'
import Parents from './modules/parents.js'
import Crossover from './modules/crossover.js'
import Mutate from './modules/mutate.js'
import Evaluate from './modules/evaluation.js'
import Selection from './modules/selection.js'
import { newPopulation } from './modules/newPopulation.js'

const DATA = getArrayFromFile('assets/table15.txt')
const MAX_WEIGHT = 106
printData(DATA)

// Этап 1 - создание популяции
let INITIAL_POPULATION = generateControlledRandomPopulation(DATA, MAX_WEIGHT)
INITIAL_POPULATION = getAdaptationAndWeight(INITIAL_POPULATION, DATA)
let CURRENT_POPULATION = INITIAL_POPULATION

let NEW_POPULATIONS_COUNT = 0
do {
  console.log('Номер поколения: ', 1 + NEW_POPULATIONS_COUNT)
  console.log('Текущая популяция:')
  console.log(CURRENT_POPULATION)

  console.log('Лучшая особь:')
  const bestEntity = findBestEntity(CURRENT_POPULATION)
  console.log(bestEntity)

  // Этап 2 - формирование детей
  let CHILDREN = []
  for (let i = 0; i < CURRENT_POPULATION.length / 2 - 1; i++) {
    const parents = Parents.getRandomParents(CURRENT_POPULATION)
    let children = Crossover.oneBreakpoint(parents)
    CHILDREN = [...CHILDREN, ...children]
  }
  CHILDREN = getAdaptationAndWeight(CHILDREN, DATA)
  console.log('Все дети:')
  console.log(CHILDREN)

  // Этап 3 - мутация детей
  console.log('Мутанты')
  let MUTANTS = Mutate.addition(CHILDREN)
  MUTANTS = getAdaptationAndWeight(MUTANTS, DATA)
  console.log(MUTANTS)

  // Этап 4 - оценивание
  console.log('Оцененные кандидаты')
  let EVALUATED = Evaluate.modify(MUTANTS, DATA, MAX_WEIGHT)
  EVALUATED = getAdaptationAndWeight(EVALUATED, DATA)
  console.log(EVALUATED)

  // Этап 5 - селекция
  console.log('Отобранные кандидаты')
  const SELECTED = Selection.proportion(EVALUATED)
  console.log(SELECTED)

  // Этап 6 - формирование нового поколения
  console.log('Новая популяция')
  const NEW_POPULATION = newPopulation(CURRENT_POPULATION, SELECTED)
  console.log(NEW_POPULATION)

  CURRENT_POPULATION = NEW_POPULATION
  NEW_POPULATIONS_COUNT++
  console.log('\n')
} while (NEW_POPULATIONS_COUNT < 3)

console.log('Финальное решение')
console.log(CURRENT_POPULATION)
console.log('Лучшее решение')
console.log(findBestEntity(CURRENT_POPULATION))

// Осталось сделать:
// - выбор стратегии формирования следующего поколения (заменять ли всех особей)
// - условие остановки
// - жадный алгоритм для генерации начальной популяции
