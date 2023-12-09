import fs from 'fs'

const getArrayFromFile = (filename) => {
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

export default getArrayFromFile
