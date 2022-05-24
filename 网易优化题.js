function animalDetails(animail) {
  let {name, type, gender} = animail
  if (!name) return 'no animal name'
  if (!type) return 'no animal type'
  if (!gender) return 'no animal gender'
  return `${name} is a ${gender} - ${type}`
}

animalDetails({name: 'xiao', type: 'dog', gender: 'male'})