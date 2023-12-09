export function mutate(children) {
  const mid = Math.floor(children[0].code.length / 2)
  const mutants = []

  children.forEach((child) => {
    let mutant = child.code.split('')
    mutant[mid] = Number(!Number(mutant[mid]))
    mutant = mutant.join('')
    mutants.push(mutant)
  })

  return mutants
}
