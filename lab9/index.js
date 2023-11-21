import printArray from './helpers/printArray.js'
import getArrayFromFile from './helpers/getArrayFromFile.js'

const items = getArrayFromFile(`table5.txt`)
items.forEach((item) => {
  item.unitValue = item.value / item.weight
})
const maxWeight = 60

const chosenAlgorithm = Number(process.argv[2])
// 1 - по ценности
// 2 - по удельной ценности

printArray(items)
console.log(`Вместимость: ${maxWeight}`)

let totalWeight = 0
let totalValue = 0
let result = Array(items.length).fill(0)

for (let i = 0; i < items.length; i++) {
  console.log(`\nШаг номер ${i + 1}`)

  let message = chosenAlgorithm === 1 ? 'ценности' : 'удельной ценности'
  console.log(`Выбираем случайный предмет по ${message} с помощью рулетки из оставшихся...`)
  let bestItem = generateRandom(items)
  if (bestItem === null) {
    console.log(`Не осталось предметов, которые бы влезли в рюкзак`)
    break
  }

  console.log(`Выбран предмет ${bestItem.id + 1}`)
  console.log(
    `Стоимость: ${bestItem.value}; Вес: ${
      bestItem.weight
    }; Удельная ценность: ${bestItem.unitValue.toFixed(3)}`
  )
  result[bestItem.id] = 1
  totalWeight += bestItem.weight
  totalValue += bestItem.value
  console.log(`Решение изменилось на `, result)
  console.log(`Вес ранца: ${totalWeight}/${maxWeight}`)
  console.log(`Ценность ранца: ${totalValue}`)
}

console.log(`\nРешение: `, result)
printArray(items.filter((item) => result[item.id] === 1))
console.log(`Итоговый вес ранца: ${totalWeight}/${maxWeight}`)
console.log(`Итоговая ценность ранца: ${totalValue}`)

// На шкале длиной, равной сумме ценностей всех предметов
// выбираем случайную точку и на её основе выбираем предмет
function generateRandom(items) {
  items = items.filter((item) => result[item.id] !== 1)
  if (items.length === 0) return null

  let totalSum
  let generatedNumber
  switch (chosenAlgorithm) {
    case 1:
      totalSum = items.reduce((acc, curr) => acc + curr.value, 0)
      generatedNumber = Math.ceil(Math.random() * totalSum)
      break
    case 2:
      totalSum = items.reduce((acc, curr) => acc + curr.unitValue, 0)
      generatedNumber = Math.random() * totalSum
      break
    default:
      return null
  }

  let segment = 0
  let chosen = null
  for (let i = 0; i < items.length; i++) {
    segment += chosenAlgorithm === 1 ? items[i].value : items[i].unitValue
    if (generatedNumber <= segment) {
      chosen = items[i]
      break
    }
  }
  let doesFit = chosen.weight <= maxWeight - totalWeight
  if (!doesFit) {
    let itemsWithoutCurrent = items.filter((item) => item.id !== chosen.id)
    return generateRandom(itemsWithoutCurrent)
  }
  return chosen
}
