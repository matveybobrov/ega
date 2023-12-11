// Одноточечный
function oneBreakpoint(parents) {
  let breakPoint = Math.ceil(parents.length / 2)
  let parentsCodes = parents.map((parent) => parent.code)

  const child1 =
    parentsCodes[0].slice(0, breakPoint + 1) +
    parentsCodes[1].slice(breakPoint + 1, parentsCodes[0].length)
  const child2 =
    parentsCodes[1].slice(0, breakPoint + 1) +
    parentsCodes[0].slice(breakPoint + 1, parentsCodes[0].length)
  return [child1, child2]
}

// Однородный
function homogenous(parents) {
  const childrenCount = 2
  const children = []

  for (let i = 0; i < childrenCount; i++) {
    let child = ''
    for (let j = 0; j < parents[0].length; j++) {
      const chosenParentIndex = Math.floor(Math.random() * 2)
      const chosenParent = parents[chosenParentIndex]
      child += chosenParent[j]
    }
    children.push(child)
  }
  return children
}

export default { oneBreakpoint, homogenous }
