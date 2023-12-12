import { roulette } from '../helpers/roulette.js'

// Пропорциональная
function proportion(entities) {
  const count = entities.length
  const selectedEntities = []
  const adaptations = entities.map((e) => e.adaptation)
  console.log(adaptations)

  while (selectedEntities.length < count) {
    const [id] = roulette(adaptations, 1)
    console.log(id)
    selectedEntities.push(entities[id])
  }

  return selectedEntities
}

// Турнир
function tournament(entities) {
  const competitorsCount = 2

  const selectedEntities = []
  while (selectedEntities.length < entities.length) {
    const competitors = []
    while (competitors.length < competitorsCount) {
      const randomId = Math.floor(Math.random() * entities.length)
      const competitor = entities[randomId]
      if (!competitors.includes(competitor)) {
        competitors.push(competitor)
      }
    }
    const adaptations = competitors.map((c) => c.adaptation)
    const bestAdaptation = Math.max(...adaptations)
    const bestCompetitorId = adaptations.indexOf(bestAdaptation)
    const bestCompetitor = competitors[bestCompetitorId]
    selectedEntities.push(bestCompetitor)
  }
  return selectedEntities
}

export default { tournament, proportion }
