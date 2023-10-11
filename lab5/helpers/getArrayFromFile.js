import fs from 'fs'

const getArrayFromFile = (filename) => {
  let fileContent = fs.readFileSync(filename, 'utf8')

  // Преобразуем входные данные в двумерный массив чисел
  let arr = fileContent.split('\r\n')
  arr = arr.map((item) => item.split(' '))
  arr.forEach((subarr) => {
    subarr.forEach((item, index) => {
      subarr[index] = Number(item)
    })
  })

  return arr
}

export default getArrayFromFile
