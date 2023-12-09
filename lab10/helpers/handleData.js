import fs from 'fs'

export function getArrayFromFile(filename) {
  let fileContent = fs.readFileSync(filename, 'utf8')

  // Преобразуем входные данные в двумерный массив чисел
  let arr = fileContent.split('\r\n')
  arr = arr.map((item) => item.split(' '))
  arr = arr.map((subarr, index) => {
    return {
      id: index,
      value: Number(subarr[0]),
      weight: Number(subarr[1]),
    }
  })

  return arr
}

export function printData(array) {
  const arrayCopy = JSON.parse(JSON.stringify(array))

  let tableHeader = '     Цена   Вес'
  console.log(tableHeader)
  arrayCopy.forEach((item) => {
    let itemValue = String(item.value)
    let itemWeight = String(item.weight)
    console.log(String(item.id).padStart(2) + '|' + itemValue.padStart(6) + itemWeight.padStart(6))
  })
}
