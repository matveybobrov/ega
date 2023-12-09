import isSolution from '../helpers/isSolution.js'

export function selection(entities, data, maxWeight) {
  const selectedEntities = entities.filter((e) => isSolution(e, data, maxWeight))
  return selectedEntities
}
