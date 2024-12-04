export const generateRandomWord = (length = 10) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz' // Alfabeto para la palabra
  let word = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    word += characters[randomIndex]
  }

  return word
}
