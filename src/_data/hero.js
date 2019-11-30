module.exports = {
  title: 'RuneLite',
  url: 'https://runelite.net',
  logo: '/img/runelite_logo_transparent.png',
  description: `A popular free, open-source and super fast client for Old School RuneScape`,
  images: ['/img/carousel/1.png', '/img/carousel/2.png', '/img/carousel/3.png'],
  buttons: [
    {
      link:
        'https://github.com/runelite/launcher/releases/download/2.1.0/RuneLiteSetup32.exe',
      icon: 'fab fa-fw fa-windows',
      text: 'Download for Windows (32 bit)',
      color: 'primary',
      dropdown: true,
      os: 'Windows32'
    },
    {
      link:
        'https://github.com/runelite/launcher/releases/download/2.1.0/RuneLiteSetup.exe',
      icon: 'fab fa-fw fa-windows',
      text: 'Download for Windows (64 bit)',
      color: 'primary',
      dropdown: true,
      os: 'Windows64'
    },
    {
      link:
        'https://github.com/runelite/launcher/releases/download/2.1.0/RuneLite.dmg',
      icon: 'fab fa-fw fa-apple',
      text: 'Download for macOS',
      color: 'secondary',
      dropdown: true,
      os: 'macOS'
    },
    {
      link:
        'https://github.com/runelite/launcher/releases/download/2.1.0/RuneLite.AppImage',
      icon: 'fab fa-fw fa-linux',
      text: 'Download for Linux (64 bit)',
      color: 'info',
      dropdown: true,
      os: 'Linux64'
    },
    {
      link:
        'https://github.com/runelite/launcher/releases/download/2.1.0/RuneLite.jar',
      icon: 'fas fa-fw fa-coffee',
      text: 'Download for all platforms',
      color: 'success',
      dropdown: true,
      os: 'all'
    },
    {
      link: 'https://github.com/runelite/',
      icon: 'fab fa-fw fa-github',
      text: 'View on GitHub',
      color: 'info'
    }
  ]
}
