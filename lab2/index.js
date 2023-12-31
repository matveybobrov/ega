let i = 0
const L = 5
// Получаем значение из командной строки
const N = process.argv[2]
const excludedCodes = []
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
  const areaCodes = area.map((item) => getPrispByCode(item))
  console.log(`Приспособленности окрестности: ${areaCodes}`)

  if (area.length > 0) {
    // Получаем случайную кодировку из окрестности
    let randomCode = area[Math.floor(Math.random() * area.length)]
    console.log(`Выбранная кодировка в окрестности: ${randomCode}`)
    console.log(`Приспособленность выбранной кодировки: ${getPrispByCode(randomCode)}`)

    if (max < getPrispByCode(randomCode)) {
      max = getPrispByCode(randomCode)
      maxS = randomCode
      console.log(`Лучшая кодировка изменилась на ${randomCode}`)
    } else {
      console.log(`Лучшая кодировка не изменилась`)
    }
    excludedCodes.push(randomCode)
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

function getPrispByCode(code) {
  const x = parseInt(code, 2)
  const prisp = Math.pow(x - Math.pow(2, L - 1), 2)
  return prisp
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
