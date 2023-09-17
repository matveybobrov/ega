let i = 0
const L = 15
// Получаем значение из командной строки
const N = process.argv[2]
let max = 0
let maxS = ''

console.log('Ландшафт в формате "кодировка: приспособленность":')
for (let i = 0; i < 32; i++) {
  const currentCode = generateCode()
  const currentPrisp = getPrispByCode(currentCode)
  console.log(`${currentCode} : ${currentPrisp}`)
}
console.log('--------------')

while (i < N) {
  console.log(`Номер шага: ${i}`)
  console.log(`Текущий максимум приспособленности: ${max}`)
  console.log(`Текущая лучшая кодировка: ${maxS}`)

  const code = generateCode()
  const prisp = getPrispByCode(code)

  console.log(`Выбранная кодировка: ${code}`)
  console.log(`Приспособленность выбранной кодировки: ${prisp}`)

  if (max < prisp) {
    max = prisp
    maxS = code
    console.log(`Максимальная кодировка теперь ${maxS}`)
    console.log(`Максимальная приспособленность теперь ${max}`)
  } else {
    console.log(`Максимальные приспособленность и кодировка не изменились`)
  }

  console.log('--------------')
  i++
}

function generateCode() {
  let S = Array(15).fill(1)
  // Math.random() генерирует число в диапазоне [0,1), а Math.floor() округляет в меньшую сторону
  S = S.map((item) => Math.floor(Math.random() * 2)).join('')
  return S
}

function getPrispByCode(code) {
  return parseInt(code, 2)
}

console.log(`Решение`)
console.log(`Кодировка: ${maxS}`)
console.log(`Приспособленность: ${max}`)
