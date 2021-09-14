module.exports = {
  title: 'RuneLite',
  url: 'https://runelite.net',
  logo: '/img/runelite_logo_transparent.png',
  description: `A popular free, open-source and super fast client for Old School RuneScape`,
  images: ['/img/carousel/1.png', '/img/carousel/2.png', '/img/carousel/3.png'],
  buttons: [
    {
      link:
        'https://github.com/runelite/launcher/releases/download/2.1.7/RuneLiteSetup32.exe',
      icon: 'fab fa-fw fa-windows',
      text: {
        os: 'Windows',
        arch: '32 bit'
      },
      os: 'Windows32'
    },
    {
      link:
        'https://github.com/runelite/launcher/releases/download/2.1.7/RuneLiteSetup.exe',
      icon: 'fab fa-fw fa-windows',
      text: {
        os: 'Windows',
        arch: '64 bit'
      },
      os: 'Windows64'
    },
    {
      link:
        'https://github.com/runelite/launcher/releases/download/2.1.5/RuneLite.dmg',
      icon: 'fab fa-fw fa-apple',
      text: {
        os: 'macOS',
        arch: 'Intel'
      },
      os: 'macOS'
    },
    {
      link:
        'https://github.com/runelite/launcher/releases/download/2.1.5/RuneLite.AppImage',
      icon: 'fab fa-fw fa-linux',
      text: {
        os: 'Linux',
        arch: 'x64'
      },
      os: 'Linux64'
    },
    {
      link:
        'https://github.com/runelite/launcher/releases/download/2.1.6/RuneLite-aarch64.AppImage',
      icon: 'fab fa-fw fa-linux',
      text: {
        os: 'Linux',
        arch: 'Aarch64'
      },
      os: 'LinuxAarch64'
    },
    {
      link:
        'https://github.com/runelite/launcher/releases/download/2.1.5/RuneLite.jar',
      icon: 'fas fa-fw fa-coffee',
      text: {
        os: 'All platforms'
      },
      os: 'all'
    }
  ]
}
