export function mutate(children) {
  const mid = Math.ceil(children.length / 2) + 1
  const mutants = []

  children.forEach((child) => {
    let mutant = child.split('')
    mutant[mid] = Number(!Number(mutant[mid]))
    mutant = mutant.join('')
    mutants.push(mutant)
  })

  return mutants
}
