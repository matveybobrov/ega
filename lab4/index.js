let i = 0
const L = 7
// Получаем значение из командной строки
const N = process.argv[2]
const M = process.argv[3]
let excludedCodes = []

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

let maxS = generateCode()
let max = getPrispByCode(maxS)

let returnedCode, returnedPrisp
while (i < N) {
  console.log('\n$$$$$$$$$$$$$\n')
  switch (Math.floor(Math.random() * 3)) {
    case 0:
      console.log('Выбранный метод - Монте-Карло')
      ;[returnedCode, returnedPrisp] = monteKarlo()
      if (max < returnedPrisp) {
        maxS = returnedCode
        max = returnedPrisp
        console.log(`По итогу выполнения метода лучшая кодировка изменилась на ${maxS} : ${max}`)
      } else {
        console.log(`По итогу выполнения метода лучшая кодировка не изменилась`)
      }
      break
    case 1:
      console.log('Выбранный метод - Поиск в глубину')
      ;[returnedCode, returnedPrisp] = deepSearch()
      if (max < returnedPrisp) {
        maxS = returnedCode
        max = returnedPrisp
        console.log(`По итогу выполнения метода лучшая кодировка изменилась на ${maxS} : ${max}`)
      } else {
        console.log(`По итогу выполнения метода лучшая кодировка не изменилась`)
      }
      break
    case 2:
      console.log('Выбранный метод - Поиск в ширину')
      ;[returnedCode, returnedPrisp] = breadthSearch()
      if (max < returnedPrisp) {
        maxS = returnedCode
        max = returnedPrisp
        console.log(`По итогу выполнения метода лучшая кодировка изменилась на ${maxS} : ${max}`)
      } else {
        console.log(`По итогу выполнения метода лучшая кодировка не изменилась`)
      }
      break
  }
  i++
}

function monteKarlo() {
  let localMax = max
  let localMaxS = maxS
  for (let i = 0; i < M; i++) {
    console.log(`Номер шага: ${i}`)
    console.log(`Текущий максимум приспособленности: ${localMax}`)
    console.log(`Текущая лучшая кодировка: ${localMaxS}`)

    const code = generateCode()
    const prisp = getPrispByCode(code)

    console.log(`Случайно сгенерированная кодировка: ${code}`)
    console.log(`Приспособленность сгенерированной кодировки: ${prisp}`)

    if (localMax < prisp) {
      localMax = prisp
      localMaxS = code
      console.log(`Максимальная кодировка теперь ${localMaxS}`)
      console.log(`Максимальная приспособленность теперь ${localMax}`)
    } else {
      console.log(`Лучшая кодировка не изменилась`)
    }

    console.log('---')
  }
  return [localMaxS, localMax]
}

function deepSearch() {
  let localMax = max
  let localMaxS = maxS
  excludedCodes = []
  for (let i = 0; i < M; i++) {
    console.log(`Номер шага: ${i}`)
    console.log(`Текущая лучшая кодировка: ${localMaxS}`)
    console.log(`Текущий максимум приспособленности: ${localMax}`)

    const area = getArea(maxS, true)
    const areaPrisps = area.map((item) => getPrispByCode(item))
    console.log('Окрестность:')
    for (let i = 0; i < area.length; i++) {
      console.log(`${area[i]} : ${areaPrisps[i]}`)
    }

    if (area.length > 0) {
      // Получаем случайную кодировку из окрестности
      let randomCode = area[Math.floor(Math.random() * area.length)]
      console.log(`Выбранная кодировка в окрестности: ${randomCode}`)
      console.log(`Приспособленность выбранной кодировки: ${getPrispByCode(randomCode)}`)

      if (localMax < getPrispByCode(randomCode)) {
        localMax = getPrispByCode(randomCode)
        localMaxS = randomCode
        console.log(`Лучшая кодировка изменилась на ${randomCode}`)
      } else {
        console.log(`Лучшая кодировка не изменилась`)
      }
      excludedCodes.push(randomCode)
    }
    console.log('---')
  }
  return [localMaxS, localMax]
}

function breadthSearch() {
  let localMax = max
  let localMaxS = maxS
  for (let i = 0; i < M; i++) {
    console.log(`Номер шага: ${i}`)
    console.log(`Текущая лучшая кодировка: ${localMaxS}`)
    console.log(`Текущий максимум приспособленности: ${localMax}`)

    const area = getArea(maxS, false)
    const areaPrisps = area.map((item) => getPrispByCode(item))
    console.log('Окрестность:')
    for (let i = 0; i < area.length; i++) {
      console.log(`${area[i]} : ${areaPrisps[i]}`)
    }

    const [bestCode, bestPrisp] = getBestInArea(area, areaPrisps)
    console.log(`Лучшая кодировка в окрестности: ${bestCode}`)
    console.log(`Приспособленность лучшей кодировки: ${bestPrisp}`)

    if (localMax < bestPrisp) {
      localMax = bestPrisp
      localMaxS = bestCode
      console.log(`Лучшая кодировка изменилась на ${bestCode}`)
    } else {
      console.log(`Лучшая кодировка не изменилась`)
      return [localMaxS, localMax]
    }

    console.log('---')
  }
  return [localMaxS, localMax]
}

function getPrispByCode(code) {
  const decimal = parseInt(code, 2)
  const prisp = (5 * Math.sin(decimal) + Math.log(decimal)).toFixed(2)

  return isFinite(prisp) ? prisp : 0
}

function generateCode() {
  let S = Array(L).fill(1)
  // Math.random() генерирует число в диапазоне [0,1), а Math.floor() округляет в меньшую сторону
  S = S.map(() => Math.floor(Math.random() * 2)).join('')
  return S
}

function getArea(code, isExclude) {
  const area = []

  for (let i = 0; i < code.length; i++) {
    let h = code.split('')
    h[i] = Math.abs(code[i] - 1)
    h = h.join('')
    if (isExclude && !excludedCodes.includes(h)) {
      area.push(h)
    } else if (!isExclude) {
      area.push(h)
    }
  }
  return area
}

function getBestInArea(area, areaPrisps) {
  const bestPrispId = areaPrisps.indexOf(String(Math.max(...areaPrisps).toFixed(2)))
  const bestPrisp = areaPrisps[bestPrispId]
  const bestCode = area[bestPrispId]
  return [bestCode, bestPrisp]
}

console.log('\n$$$$$$$$$$$$$\n')
console.log(`Решение`)
console.log(`Кодировка: ${maxS}`)
console.log(`Приспособленность: ${max}`)
