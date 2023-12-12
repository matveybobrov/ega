import isSolution from '../helpers/isSolution.js'

// Элиминация
function elimination(entities, data, maxWeight) {
  let selectedEntities = entities.filter((e) => isSolution(e.code, data, maxWeight))
  selectedEntities = selectedEntities.map((e) => e.code)
  return selectedEntities
}

// Модификация генотипа
function modify(entities, data, maxWeight) {
  const selectedEntities = []
  const values = data.map((item) => item.value)

  for (let i = 0; i < entities.length; i++) {
    const entitie = entities[i]
    let code = entitie.code
    let valuesCopy = [...values]

    if (isSolution(code, data, maxWeight)) {
      selectedEntities.push(code)
      continue
    }
    while (!isSolution(entitie.code, data, maxWeight)) {
      const minValue = Math.min(...valuesCopy)
      const minValueId = valuesCopy.indexOf(minValue)
      valuesCopy = valuesCopy.map((v, id) => (id === minValueId ? Infinity : v))
      if (code[minValueId] === '1') {
        code = code.split('')
        code = code.map((bit, id) => (id === minValueId ? '0' : bit))
        code = code.join('')
        entitie.code = code
      }
    }
    selectedEntities.push(entitie.code)
  }

  return selectedEntities
}

export default { elimination, modify }
