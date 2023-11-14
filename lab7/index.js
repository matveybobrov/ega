import printArray from './helpers/printArray.js'
import getArrayFromFile from './helpers/getArrayFromFile.js'

const items = getArrayFromFile(`table5.txt`)
const maxWeight = 35

printArray(items)
console.log(`Вместимость: ${maxWeight}`)

let totalWeight = 0
let totalValue = 0
let result = Array(items.length).fill(0)

for (let i = 0; i < items.length; i++) {
  console.log(`\nШаг номер ${i + 1}`)

  console.log(`Ищем предмет с максимальной ценностью из оставшихся...`)
  let bestItem = getMostValuableItem(items)
  if (bestItem === null) {
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
console.log(`Итоговый вес ранца: ${totalWeight}/${maxWeight}`)
console.log(`Итоговая ценность ранца: ${totalValue}`)

// Рекурсивная функция
function getMostValuableItem(items) {
  // Исключаем уже взятые предметы
  items = items.filter((item) => result[item.id] !== 1)

  let noMoreItems = items.length === 0
  if (noMoreItems) {
    return null
  }

  let values = items.map((item) => item.value)
  let mostValuableItemValue = Math.max(...values)
  let indexOfMostValuableItem = values.indexOf(mostValuableItemValue)

  let mostValuableItem = items[indexOfMostValuableItem]

  let itemDoesntFit = mostValuableItem.weight > maxWeight - totalWeight
  if (itemDoesntFit) {
    let itemsWithoutCurrent = items.filter((item) => item.id !== mostValuableItem.id)
    return getMostValuableItem(itemsWithoutCurrent)
  }

  let foundItem = items[indexOfMostValuableItem]
  return foundItem
}
