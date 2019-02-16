# runelite.net

[![Build Status](https://travis-ci.org/runelite/runelite.net.svg?branch=master)](https://travis-ci.org/runelite/runelite.net)

Based on [redux-boot](https://github.com/deathbeam/redux-boot).

## Local development

Requirements

- Node - [Installing Node](https://nodejs.org/en/download/), requires version `>= 8.12.0`
- NPM: - [Installs with Node](https://docs.npmjs.com/getting-started/installing-node#install-npm--manage-npm-versions), requires version `>= 5.3.0`

First, you need to install all dependencies, so run

```
npm install
```

To start local server, simply run

```
npm start
```

from console. Your app should be now running on `http://localhost:3000` and you
will be able to see it from your web browser. To debug Redux actions, simply check
your web console.

### Creating blog posts

To create blog post, navigate to [\_posts](src/_posts) directory. Here, create
file with format (where the time is UTC timezone)

```
YYYY-MM-DD-HH-mm-My-Post-Title.md
```

and edit it in your favorite markdown editor. Content of each post should
consist of:

```diff
+ ---
+ title: 'My Post Title'
+ description: 'My Post description'
+ author: 'Me'
+ ---
+
+ ... rest of markdown content
```

If you do not want to display your post on home page just add `skip` metadata:

```diff
  ---
  title: 'My Post Title'
  description: 'My Post description'
  author: 'Me'
+ skip: true
  ---

  ... rest of markdown content
```

Now save it and create PR to master branch on this repo.

### Adding features

To add new feature to feature list, simply take an image and put it in
[features](public/img/features) directory. Then, open
[features.js](src/_data/features.js) file and add your feature at the bottom,
before `]`

```diff
  {
    image: '/img/features/mousehighlight.png',
    title: 'Mouse highlighting',
    description: '...',
    link: '...'
- }
+ },
+ {
+   image: '/img/features/my_feature.png',
+   title: 'My Feature Name',
+   description: 'My feature description',
+   link: 'https://example.com'
+ }
]
```

Now save the file and create PR to master branch on this repo.

## Publishing to GitHub pages

The deployment to GitHub pages is done automatically using [Travis CI GitHub
pages deployement](https://docs.travis-ci.com/user/deployment/pages) and it is
deployed to the `gh-pages` branch from `master` branch.
