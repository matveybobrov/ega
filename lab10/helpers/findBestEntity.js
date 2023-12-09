export default function findBestEntity(entities) {
  const adaptations = entities.map((entitiy) => entitiy.adaptation)
  const bestAdaptation = Math.max(...adaptations)
  const bestAdaptationId = adaptations.indexOf(bestAdaptation)
  return entities[bestAdaptationId]
}
