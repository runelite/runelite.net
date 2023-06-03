export const isChristmasTime = () => new Date().getMonth() === 11
export const getChristmasImage = image => {
  return isChristmasTime() ? image.replace('.webp', '_xmas.webp') : image
}
