# runelite.net

[![Build Status](https://travis-ci.org/runelite/runelite.net.svg?branch=master)](https://travis-ci.org/runelite/runelite.net)

Based on [redux-boot](https://github.com/deathbeam/redux-boot).

## Local development

First, you need to install all dependencies, so run

```
npm install
```

To start local server, simply run

```
npm start
```

from console. Your app should be now running on `http://localhost:3000` and you
will be able to see it from your web browser. To debug Redux actions, navigate
to `http://remotedev.io/local/` and you will be able to see all your Redux
actions.

### Creating blog posts

To create blog post, navigate to [_posts](src/_posts) directory. Here, create
file with format

```
YYYY-MM-DD-My-Post-Title.md
```

and edit it in your favorite markdown editor. Content of each post should
consists of:

```diff
+ ---
+ title: 'My Post Title'
+ description: 'My Post description'
+ ---
+ 
+ ... rest of markdown content
```

Now save it and create PR to master branch on this repo.

### Adding features

To add new feature to feature list, simply take image and put it in
[features](public/img/features) directory. Then, open
[features.js](src/_data/features.js) file and add your feature at the bottom,
before `]`

```diff
  {
    image: '/img/features/mousehighlight.png',
    title: 'Mouse highlighting',
    subtitle: 'Highlights content under your mouse cursor',
    description: '...'
- }
+ },
+ {
+   image: '/img/features/my_feature.png',
+   title: 'My Feature Name',
+   subtitle: 'My feature sub title',
+   description: 'My feature description'
+ }
]
```

Now save the file and create PR to master branch on this repo.

## Publishing to GitHub pages

The deployement to GitHub pages is done automatically using [Travis CI GitHub
pages deployement](https://docs.travis-ci.com/user/deployment/pages) and it is
deployed to the `gh-pages` branch from `master` branch.
