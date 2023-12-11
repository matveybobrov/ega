import isSolution from '../helpers/isSolution.js'

// Элиминация
export function evaluate(entities, data, maxWeight) {
  const selectedEntities = entities.filter((e) => isSolution(e.code, data, maxWeight))
  return selectedEntities
}

// Модификация генотипа (доделать)
function modify(entities, data, maxWeight) {
  const selectedEntities = []
  const values = data.filter((item) => item.value)

  for (let i = 0; i < entities.length; i++) {
    const entitie = entities[i]

    if (isSolution(entitie.code, data, maxWeight)) {
      selectedEntities.push(entitie)
      continue
    }
  }
}
