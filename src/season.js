import dayjs from 'dayjs'

export const isChristmasTime = () => dayjs().month() === 11
export const getChristmasImage = image =>
  isChristmasTime() ? image.replace('.png', '_xmas.png') : image
