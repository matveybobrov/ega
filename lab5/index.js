import getArrayFromFile from './helpers/getArrayFromFile.js'
import printArray from './helpers/printArray.js'

// Выбираем таблицу по значению из коммандной строки
const table = process.argv[2]

let originalArr = getArrayFromFile(`table${table}.txt`)

// Количество городов
const N = originalArr.length
// Цена всех переходов
let Q = 0
// Переходы
const S = []

console.log('Начальная таблица:')
printArray(originalArr)

let i = 1
console.log(`\nШаг номер ${i}`)

// Случайно выбираем первый город
let currentCity = Math.floor(Math.random() * N) + 1
console.log(`Начальный выбранный x = ${currentCity}`)

S.push(currentCity)
console.log(`S изменился на [${S}]`)

while (i !== N) {
  console.log(`\nШаг номер ${(i += 1)}`)
  console.log(`Ищем ближайший к ${currentCity} город (не включая обойдённые)`)

  let routes = originalArr[currentCity - 1]
  // Исключаем обойдённые города
  routes = routes.filter((item, index) => !S.includes(index + 1))
  // Исключаем переходы в себя
  routes = routes.filter((item) => item !== 0)

  let closestCity = originalArr[currentCity - 1].indexOf(Math.min(...routes)) + 1
  let distance = originalArr[currentCity - 1][closestCity - 1]

  console.log(`${currentCity} -> ${closestCity} : ${distance}`)

  Q += distance
  console.log('Q изменилось на ', Q.toFixed(2))

  currentCity = closestCity
  S.push(currentCity)
  console.log(`S изменился на `, S)
}

// Расстояние перехода из последнего города в первый
Q += originalArr[S[0] - 1][S[S.length - 1] - 1]
console.log('\nРешение:')
console.log(`S: `, S)
console.log(`Q: `, Q.toFixed(2))
