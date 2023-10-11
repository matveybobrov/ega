const removeFromArray = (array, index) => {
  // Обнуляем строку
  array[index] = new Array(array.length).fill(0)
  // Обнуляем столбец
  array.forEach((subarr, id) => {
    subarr[index] = 0
  })
}

export default removeFromArray
