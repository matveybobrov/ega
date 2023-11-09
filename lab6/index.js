import getArrayFromFile from './helpers/getArrayFromFile.js'
import printArray from './helpers/printArray.js'

// Выбираем таблицу по значению из коммандной строки
const table = process.argv[2]

let originalArr = getArrayFromFile(`table${table}.txt`)

// Размер матрицы
const N = originalArr.length
// Цена всех переходов
let Q = 0
// Переходы
let S = []

console.log('Начальная таблица:')
printArray(originalArr)

let i = 1
console.log(`\nШаг номер ${i}`)

// Случайно выбираем первый город
let currentCityIndex = Math.ceil(Math.random() * N) - 1
console.log(`Начальный выбранный x = ${currentCityIndex + 1}`)

S.push(currentCityIndex + 1)
console.log(`S изменился на [${S}]`)

while (i !== N) {
  console.log(`\nШаг номер ${(i += 1)}`)

  console.log(`Ищем ближайший город для каждого города из S:`, S)
  console.log(`(не включая уже пройденные города)`)

  let minCity = S[0]
  let minTarget = null
  let minDistance = Infinity
  S.forEach((city) => {
    // Функция возвращает массив из самого города, ближайшего к нему и расстояния между ними
    const [current, closest, distance] = getTransitionData(city)
    console.log(`${current} -> ${closest}: ${distance}`)
    if (distance < minDistance) {
      minCity = city
      minDistance = distance
      minTarget = closest
    }
  })

  console.log(`Кратчайший переход: `)
  console.log(`${minCity} -> ${minTarget}: ${minDistance}`)

  console.log(`Вставляем ${minTarget} в решение после ${minCity}`)
  let indexOfMinCity = S.indexOf(minCity)
  const leftSide = S.slice(0, indexOfMinCity + 1)
  const rightSide = S.slice(indexOfMinCity + 1)
  S = leftSide.concat(minTarget).concat(rightSide)

  console.log(`Решение: `, S)
}

// Считаем стоимость всех переходов
for (let i = 0; i < S.length - 1; i++) {
  Q += originalArr[S[i] - 1][S[i + 1] - 1]
}
Q += originalArr[S[0] - 1][S[S.length - 1] - 1]

console.log(`\nФинальное решение:`)
console.log(`S: `, S)
console.log(`Q: `, Q.toFixed(2))

function getTransitionData(city) {
  let possibleRoutes = originalArr[city - 1]
  // Исключаем из обхода уже пройденные города
  possibleRoutes = possibleRoutes.filter((item, index) => !S.includes(index + 1))
  // Исключаем из обхода нули
  possibleRoutes = possibleRoutes.filter((item) => item !== 0)
  let closestCity = originalArr[city - 1].indexOf(Math.min(...possibleRoutes)) + 1
  let distance = originalArr[city - 1][closestCity - 1]
  return [city, closestCity, distance]
}
