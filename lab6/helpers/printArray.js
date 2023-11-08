const printArray = (array) => {
  const arrayCopy = JSON.parse(JSON.stringify(array))

  let tableHeader = ''
  arrayCopy.forEach((item, index) => {
    tableHeader += String(index + 1).padStart(7)
  })
  console.log(tableHeader)
  arrayCopy.forEach((subarray, index) => {
    arrayCopy[index] = subarray.map((item) => String(item).padStart(6))
    console.log(String(index + 1).padStart(2) + '|' + String(arrayCopy[index]))
  })
}

export default printArray
