let i = 0
const L = 5
// Получаем значение из командной строки
const N = process.argv[2]
const excludedCodes = []

console.log('Ландшафт в формате "кодировка: приспособленность":')
for (let i = 0; i < 32; i++) {
  const currentCode = generateCode()
  const currentPrisp = getPrispByCode(currentCode)
  console.log(`${currentCode} : ${currentPrisp}`)
}
console.log('--------------')

// Генерируем начальную кодировку
const code = generateCode()
const prisp = getPrispByCode(code)
let gamma = ''
let max = prisp
let maxS = code

while (i < N) {
  console.log(`Номер шага: ${i}`)
  console.log(`Текущий максимум приспособленности: ${max}`)
  console.log(`Текущая лучшая кодировка: ${maxS}`)

  const area = getArea(code)
  console.log(`Текущая окрестность: ${area}`)
  const areaCodes = area.map((item) => getPrispByCode(item))
  console.log(`Приспособленности окрестности: ${areaCodes}`)

  if (area.length > 0) {
    // Получаем случайную кодировку из окрестности
    gamma = area[Math.floor(Math.random() * area.length)]
    console.log(`Выбранная кодировка в окрестности: ${gamma}`)
    if (max < getPrispByCode(gamma)) {
      max = getPrispByCode(gamma)
      maxS = gamma
      excludedCodes.push(gamma)
      console.log(`Лучшая кодировка изменилась на ${gamma}`)
    } else {
      console.log(`Лучшая кодировка не изменилась`)
    }
  }

  console.log('--------------')
  i++
}

function generateCode() {
  let S = Array(L).fill(1)
  // Math.random() генерирует число в диапазоне [0,1), а Math.floor() округляет в меньшую сторону
  S = S.map((item) => Math.floor(Math.random() * 2)).join('')
  return S
}

function getPrispByCode(code) {
  return parseInt(code, 2)
}

function getArea(code) {
  const area = []

  for (let i = 0; i < code.length; i++) {
    let h = code.split('')
    h[i] = Math.abs(code[i] - 1)
    h = h.join('')
    if (!excludedCodes.includes(h)) {
      area.push(h)
    }
  }
  return area
}

console.log(`Решение`)
console.log(`Кодировка: ${maxS}`)
console.log(`Приспособленность: ${max}`)
