const printArray = (array) => {
  const arrayCopy = JSON.parse(JSON.stringify(array))

  let tableHeader = '     Цена   Вес'
  console.log(tableHeader)
  arrayCopy.forEach((item) => {
    let itemValue = String(item.value)
    let itemWeight = String(item.weight)
    console.log(String(item.id).padStart(2) + '|' + itemValue.padStart(6) + itemWeight.padStart(6))
  })
}

export default printArray
