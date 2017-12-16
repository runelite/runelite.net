import { faCoffee } from '@fortawesome/fontawesome-free-solid'
import { faWindows, faGithub } from '@fortawesome/fontawesome-free-brands'

export default {
  title: 'RuneLite',
  logo: '/img/logo.png',
  description: `
    RuneLite is a free, open-source and super fast client for Old School
    RuneScape. You can download the RuneLite launcher for various platforms below
    or contribute to the project on GitHub.
  `,
  buttons: [
    {
      link: 'https://github.com/runelite/launcher/releases/download/1.2.1/Runelite.exe',
      icon: faWindows,
      text: 'Download for Windows',
      color: 'primary'
    },
    {
      link: 'https://github.com/runelite/launcher/releases/download/1.2.1/runelite.jar',
      icon: faCoffee,
      text: 'Download for all platforms',
      color: 'success'
    },
    {
      link: 'https://github.com/runelite/',
      icon: faGithub,
      text: 'View on GitHub',
      color: 'info'
    }
  ]
}
