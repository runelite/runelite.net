export const isChristmasTime = () => new Date().getMonth() === 11
export const getChristmasImage = image =>
  isChristmasTime() ? image.replace('.png', '_xmas.png') : image
