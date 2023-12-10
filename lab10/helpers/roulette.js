export function roulette(items, count) {
  const returnedIds = []
  let itemsCopy = [...items]
  let totalValue = itemsCopy.reduce((prev, curr) => prev + curr, 0)

  while (returnedIds.length !== count) {
    const randomValue = Math.random() * totalValue
    let sector = 0
    for (let i = 0; i <= itemsCopy.length; i++) {
      sector += itemsCopy[i]
      if (randomValue < sector) {
        const currentId = items.indexOf(itemsCopy[i])
        if (!returnedIds.includes(currentId)) {
          returnedIds.push(currentId)
          itemsCopy = itemsCopy.filter((item, id) => id !== i)
          totalValue -= items[i]
        }
        break
      }
    }
  }

  return returnedIds
}
