import { h } from 'preact'

import Badge from './badge'

export default ({ ranksGained = 0, levelsGained = 0, xpGained = 0 }) => {
  return (
    <div class="skill-badges">
      <Badge value={ranksGained} />
      <Badge value={xpGained} suffix="xp" levelsGained={levelsGained} />
    </div>
  )
}
