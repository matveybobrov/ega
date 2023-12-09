// Задача о ранце

import printArray from './helpers/printArray.js'
import getArrayFromFile from './helpers/getArrayFromFile.js'

import {
  generatePopulationRandomly,
  generateControlledRandomPopulation,
} from './helpers/generatePopulation.js'

import { getRandomParents } from './helpers/chooseParents.js'
import { crossover } from './helpers/crossover.js'
import { mutate } from './helpers/mutate.js'
/*
--- Этап 0 - выбор кодировки
  (То есть выбираем вид особи из популяции)
  В задаче о ранце это бинарная кодировка вида 0101010, где:
  0 - берём предмет в рюкзак
  1 - не берём
  То есть особь имеет вид 0101010

--- Этап 1 - генерация начальной популяции
  Способы:
    1) Случайно - случайно генерируем популяцию
    2) Случайно с контролем - каждая особь популяции гарантированно является
    решением исходной задачи
    Пусть исходная задача имеет вид:
    11 1
    18 25
    23 29
    21 24
    23 27
    Тогда популяция - 5 решений этой задачи, например:
    01010
    11010
    11001
    10101
    10010

--- Этап 2.1 - выбираем родительскую пару
  Выбираем 2 особи из популяции
--- Этап 2.2 - создаём потомков (кроссовер)
  На основе 2 выбранных особей создаём двух потомков
--- Этап 2.3 - мутируем потомков
  Изменяем кодировку потомка
--- Этап 2.4 - 
*/

// Кандидат (особь - решение исходной задачи (записывается в бинарном формате))
// Кодировка решений - бинарная (0 - берём предмет, 1 - не берём)

// Cлучайный метод генерации особи - может не являться решением
// Случайный с контролем - гарантированно является решением

// Этап 1 - создание популяции
const DATA = getArrayFromFile('assets/table5.txt')
const MAX_WEIGHT = 75
printArray(DATA)

const INITIAL_POPULATION = generateControlledRandomPopulation(DATA, MAX_WEIGHT)
console.log(INITIAL_POPULATION)

// Этап 2 - выбор родительской пары
const PARENTS = getRandomParents(INITIAL_POPULATION)
console.log(PARENTS)

// Этап 3 - получаем детей (кроссовер)
const CHILDREN = crossover(PARENTS)
console.log(CHILDREN)

// Этап 4 - мутируем детей
const MUTANTS = mutate(CHILDREN)
console.log(MUTANTS)
