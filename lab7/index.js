import printArray from './helpers/printArray.js'
import getArrayFromFile from './helpers/getArrayFromFile.js'

const items = getArrayFromFile(`table5.txt`)
const maxWeight = 60

printArray(items)
console.log(`Вместимость: ${maxWeight}`)

let totalWeight = 0
let totalValue = 0
let result = Array(items.length).fill(0)

for (let i = 0; i < items.length; i++) {
  console.log(`\nШаг номер ${i + 1}`)

  console.log(`Ищем предмет с максимальной ценностью из оставшихся...`)
  let bestItem = getMostValuableItem(items)
  if (bestItem.value === null) {
    console.log(`Не осталось предметов, которые бы влезли в рюкзак`)
    break
  }

  console.log(`Лучший предмет ${bestItem.id + 1}`)
  console.log(`Стоимость: ${bestItem.value}; Вес: ${bestItem.weight}`)

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

function getMostValuableItem(items) {
  items = items.filter((item) => result[item.id] !== 1)

  let max = {
    value: null,
    weight: null,
  }

  for (let i = 0; i < items.length; i++) {
    let current = items[i]

    let isBetter = current.value > max.value
    let doesFit = current.weight <= maxWeight - totalWeight
    if (isBetter && doesFit) {
      max = current
    }
  }
  return max
}
