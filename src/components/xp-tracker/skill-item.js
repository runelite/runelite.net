import { h } from 'preact'

import { Link } from 'preact-router'
import SkillGains from './skill-gains'

const capitalizeFirstLetter = string =>
  string.charAt(0).toUpperCase() + string.slice(1)

export default function SkillItem({
  skill,
  currentSkill,
  playerName,
  levelsGained,
  rank,
  xp,
  startDate,
  endDate
}) {
  return (
    <Link
      class={`list-group-item list-group-item-action skill-item ${
        currentSkill === skill ? 'active' : ''
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
