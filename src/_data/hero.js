module.exports = {
  title: 'RuneLite',
  url: 'https://runelite.net',
  logo: '/img/runelite_icon_transparent.png',
  description: `A free, open-source and super fast client for  Old School Runescape.`,
  images: ['/img/carousel/1.png', '/img/carousel/2.png', '/img/carousel/3.png'],
  buttons: [
    {
      link:
        'https://github.com/runelite/launcher/releases/download/1.6.0/RuneLiteSetup32.exe',
      icon: 'fab fa-windows',
      text: 'Download for Windows (32 bit)',
      color: 'primary',
      dropdown: true,
      os: 'Windows32'
    },
    {
      link:
        'https://github.com/runelite/launcher/releases/download/1.6.0/RuneLiteSetup.exe',
      icon: 'fab fa-windows',
      text: 'Download for Windows (64 bit)',
      color: 'primary',
      dropdown: true,
      os: 'Windows64'
    },
    {
      link:
        'https://github.com/runelite/launcher/releases/download/1.6.0/RuneLite.dmg',
      icon: 'fab fa-apple',
      text: 'Download for macOS',
      color: 'secondary',
      dropdown: true,
      os: 'macOS'
    },
    {
      link:
        'https://github.com/runelite/launcher/releases/download/1.6.0/RuneLite.jar',
      icon: 'fas fa-coffee',
      text: 'Download for all platforms',
      color: 'success',
      dropdown: true,
      os: 'all'
    }
  ]
}
