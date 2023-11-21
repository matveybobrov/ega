const printArray = (array) => {
  const arrayCopy = JSON.parse(JSON.stringify(array))

  let tableHeader = '     Цена   Вес   Уд.ценность'
  console.log(tableHeader)
  arrayCopy.forEach((item) => {
    let itemValue = String(item.value)
    let itemWeight = String(item.weight)
    let itemUnitValue = String((item.value / item.weight).toFixed(3))
    console.log(
      String(item.id + 1).padStart(2) +
        '|' +
        itemValue.padStart(6) +
        itemWeight.padStart(6) +
        itemUnitValue.padStart(8)
    )
  })
}

export default printArray
