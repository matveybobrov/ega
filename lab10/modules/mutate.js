// Генная мутация (точечная)
function spot(children) {
  const mid = Math.floor(children[0].code.length / 2)
  const mutants = []

  for (let i = 0; i < children.length; i++) {
    let code = children[i].code
    code = code.split('')
    code[mid] = Number(!Number(code[mid]))
    code = code.join('')
    mutants.push(code)
  }

  return mutants
}

// Хромосомная мутация (дополнение)
function addition(children) {
  const mutants = []
  for (let i = 0; i < children.length; i++) {
    let code = children[i].code
    code = code.split('')
    code = code.map((bit) => Number(!Number(bit)))
    code = code.join('')
    mutants.push(code)
  }
  return mutants
}

export default { spot, addition }
