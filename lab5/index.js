import getArrayFromFile from './helpers/getArrayFromFile.js'
import printArray from './helpers/printArray.js'
import removeFromArray from './helpers/removeFromArray.js'

const table = process.argv[2]

let originalArr = getArrayFromFile(`table${table}.txt`)
let arr = getArrayFromFile(`table${table}.txt`)

const N = arr.length
let Q = 0
const S = []

console.log('Начальная таблица:')
printArray(originalArr)

let i = 1
console.log(`\nШаг номер ${i}`)

const firstCityIndex = Math.ceil(Math.random() * N) - 1
let currentCityIndex = firstCityIndex
console.log(`Начальный выбранный x = ${currentCityIndex + 1}`)

S.push(currentCityIndex + 1)
console.log(`S изменился на [${S}]`)

// Сохраняем удаляемую строку, чтобы выполнять по ней поиск минимального значения
let prevCity = arr[currentCityIndex]

console.log(`Исключаем ${currentCityIndex + 1} строку и столбец`, prevCity)
removeFromArray(arr, currentCityIndex)

console.log(`Матрица имеет вид:`)
printArray(arr)

while (i !== N) {
  console.log(`\nШаг номер ${(i += 1)}`)
  console.log(`Ищем ближайший к предыдущему город в следующей строке:`)
  console.log(prevCity)

  const prevCityWithoutNulls = prevCity.filter((item) => item !== 0)
  const currentCityValue = Math.min(...prevCityWithoutNulls)

  currentCityIndex = prevCity.indexOf(currentCityValue)
  console.log(`Минимальное значение: ${currentCityValue} для города ${currentCityIndex + 1}`)
  Q += currentCityValue
  console.log('Q изменилась на ', Q)

  const currentCity = arr[currentCityIndex]
  console.log(`Исключаем ${currentCityIndex + 1} строку и столбец: `, currentCity)

  prevCity = arr[currentCityIndex]
  removeFromArray(arr, currentCityIndex)
  console.log(`Матрица имеет вид:`)
  printArray(arr)

  S.push(currentCityIndex + 1)
  console.log(`S изменился на `, S)
}

Q += originalArr[currentCityIndex][firstCityIndex]
console.log('\nРешение:')
console.log(`S: `, S)
console.log(`Q: `, Q)
