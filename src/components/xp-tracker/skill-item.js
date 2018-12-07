import { h } from 'preact'

import { Link } from 'preact-router'
import SkillGains from './skill-gains'

const capitalizeFirstLetter = string =>
  string.charAt(0).toUpperCase() + string.slice(1)

export default ({
  skill,
  playerName,
  levelsGained,
  rank,
  xp,
  startDate,
  endDate,
  isActive
}) => {
  return (
    <Link
      class={`list-group-item list-group-item-action skill-item ${
        isActive ? 'active' : ''
      }`}
      key={skill}
      href={`/xp/show/${skill}/${playerName}/${startDate.getTime()}/${endDate.getTime()}`}
    >
      <img
        class="skill-icon"
        alt={skill}
        src={`/img/skillicons/${skill}.png`}
      />
      <span class="skill-name">{capitalizeFirstLetter(skill)}</span>
      <SkillGains
        xpGained={xp}
        levelsGained={levelsGained}
        ranksGained={rank}
      />
    </Link>
  )
}
