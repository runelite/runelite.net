import { h } from 'preact'

import Badge from './badge'

export default function SkillGains({
  ranksGained = 0,
  levelsGained = 0,
  xpGained = 0
}) {
  return (
    <div class="skill-badges">
      <Badge value={ranksGained} />
      <Badge value={xpGained} suffix="xp" />
      <Badge value={levelsGained} suffix="lvls" />
    </div>
  )
}
