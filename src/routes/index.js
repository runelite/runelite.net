import { constants } from 'router5'
import { createRoute } from '../router'
import { getCommits, getReleases, getRepository } from '../modules/git'
import { getSessionCount, getXpRange } from '../modules/runelite'
import links from '../_data/links'

export default [
  createRoute('home', '/', [
    getCommits,
    getReleases,
    getRepository,
    getSessionCount
  ]),
  createRoute('blog', '/blog'),
  createRoute('blog-show', '/blog/show/:id'),
  createRoute('features', '/features'),
  createRoute('xp-show', '/xp/show/:skill/:name/:start/:end', [getXpRange]),
  createRoute('logged-in', '/logged-in'),
  createRoute(constants.UNKNOWN_ROUTE, '/not-found'),
  {
    name: 'discord',
    path: '/discord',
    onActivate: () => window.location.replace(links.discord)
  }
]
