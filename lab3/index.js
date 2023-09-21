let i = 0
const L = 5
// Получаем значение из командной строки
const N = process.argv[2]

const codes = []
const prisps = []

const getPrispByCode = (code) => {
  if (codes.includes(code)) {
    return prisps[codes.indexOf(code)]
  }
  codes.push(code)
  const prisp = Math.floor(Math.random() * 32000)
  prisps.push(prisp)
  return prisp
}

const code = generateCode()
const prisp = getPrispByCode(code)
let max = prisp
let maxS = code

const generatedCodes = []
console.log('Ландшафт в формате "кодировка: приспособленность":')
for (let i = 0; i < 32; i++) {
  const generatedCode = generateCode()
  if (!generatedCodes.includes(generatedCode)) {
    generatedCodes.push(generatedCode)
    const generatedPrisp = getPrispByCode(generatedCode)
    console.log(`${generatedCode} : ${generatedPrisp}`)
  } else {
    i--
  }
}
console.log('--------------')

while (i < N) {
  console.log(`Номер шага: ${i}`)
  console.log(`Текущий максимум приспособленности: ${max}`)
  console.log(`Текущая лучшая кодировка: ${maxS}`)

  const area = getArea(maxS)
  console.log(`Текущая окрестность: ${area}`)
  const areaPrisps = area.map((item) => getPrispByCode(item))
  console.log(`Приспособленности окрестности: ${areaPrisps}`)

  const [bestCode, bestPrisp] = getBestInArea(area, areaPrisps)
  console.log(`Лучшая кодировка в окрестности: ${bestCode}`)
  console.log(`Приспособленность лучшей кодировки: ${bestPrisp}`)

  if (max < bestPrisp) {
    max = bestPrisp
    maxS = bestCode
    console.log(`Лучшая кодировка изменилась на ${bestCode}`)
  } else {
    console.log(`Лучших кодировок в окрестности нет`)
    break
  }

  console.log('--------------')
  i++
}

function generateCode() {
  let S = Array(L).fill(1)
  // Math.random() генерирует число в диапазоне [0,1), а Math.floor() округляет в меньшую сторону
  S = S.map(() => Math.floor(Math.random() * 2)).join('')
  return S
}

function getArea(code) {
  const area = []

  for (let i = 0; i < code.length; i++) {
    let h = code.split('')
    h[i] = Math.abs(code[i] - 1)
    h = h.join('')
    area.push(h)
  }
  return area
}

function getBestInArea(area, areaPrisps) {
  const bestPrispId = areaPrisps.indexOf(Math.max(...areaPrisps))
  const bestPrisp = areaPrisps[bestPrispId]
  const bestCode = area[bestPrispId]
  return [bestCode, bestPrisp]
}

console.log('--------------')
console.log(`Решение`)
console.log(`Кодировка: ${maxS}`)
console.log(`Приспособленность: ${max}`)
