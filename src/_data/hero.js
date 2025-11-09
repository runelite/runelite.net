module.exports = {
  title: 'RuneLite',
  url: 'https://runelite.net',
  logo: '/img/runelite_logo_transparent_small.webp',
  description: `A popular free, open-source and super fast client for Old School RuneScape`,
  images: [
    '/img/carousel/1.webp',
    '/img/carousel/2.webp',
    '/img/carousel/3.webp'
  ],
  buttons: [
    {
      link:
        'https://github.com/runelite/launcher/releases/download/2.7.6/RuneLiteSetup.exe',
      icon: 'fab fa-fw fa-windows',
      text: {
        os: 'Windows',
        arch: '64 bit'
      },
      os: 'Windows64'
    },
    {
      link:
        'https://github.com/runelite/launcher/releases/download/2.7.6/RuneLiteSetup32.exe',
      icon: 'fab fa-fw fa-windows',
      text: {
        os: 'Windows',
        arch: '32 bit'
      },
      os: 'Windows32'
    },
    {
      link:
        'https://github.com/runelite/launcher/releases/download/2.7.6/RuneLiteSetupAArch64.exe',
      icon: 'fab fa-fw fa-windows',
      text: {
        os: 'Windows',
        arch: 'ARM64'
      },
      os: 'WindowsArm64'
    },
    {
      link:
        'https://github.com/runelite/launcher/releases/download/2.7.6/RuneLite-x64.dmg',
      icon: 'fab fa-fw fa-apple',
      text: {
        os: 'macOS',
        arch: 'Intel'
      },
      os: 'macOS'
    },
    {
      link:
        'https://github.com/runelite/launcher/releases/download/2.7.6/RuneLite-aarch64.dmg',
      icon: 'fab fa-fw fa-apple',
      text: {
        os: 'macOS',
        arch: 'Apple silicon'
      },
      os: 'macOS'
    },
    {
      link:
        'https://github.com/runelite/launcher/releases/download/2.7.6/RuneLite.AppImage',
      icon: 'fab fa-fw fa-linux',
      text: {
        os: 'Linux',
        arch: 'x64'
      },
      os: 'Linux64'
    },
    {
      link:
        'https://github.com/runelite/launcher/releases/download/2.7.6/RuneLite-aarch64.AppImage',
      icon: 'fab fa-fw fa-linux',
      text: {
        os: 'Linux',
        arch: 'ARM64'
      },
      os: 'LinuxAarch64'
    },
    {
      link:
        'https://github.com/runelite/launcher/releases/download/2.7.6/RuneLite.jar',
      icon: 'fas fa-fw fa-coffee',
      text: {
        os: 'All platforms'
      },
      os: 'all'
    }
  ]
}
