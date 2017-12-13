# redux-boot

React and Redux simple boilerplate

## Local development

To start local server, simply run

```
npm start
```

from console. Your app should be now running on `http://localhost:3000` and you
will be able to see it from your web browser. To debug Redux actions, navigate
to `http://remotedev.io/local/` and you will be able to see all your Redux
actions.

## Publishing to GitHub pages

The deployement to GitHub pages is done automatically using [Travis CI GitHub
pages deployement](https://docs.travis-ci.com/user/deployment/pages).
First read the guide and set up GITHUB_TOKEN so the travis deployement will
work.

If you are deploying to a GitHub user page instead of a project page you'll need
to make two additional modifications:

First, change your repository's source branch to be any branch other than
master.
Additionally, tweak your .travis.yml scripts to push deployments to master:
```diff
deploy:
  provider: pages
  skip_cleanup: true
  github_token: $GITHUB_TOKEN # Set in travis-ci.org dashboard
  local_dir: "build"
-  target_branch: "gh-pages"
+  target_branch: master
  on:
-    branch: master
+    branch: "my-branch"
```

Note that if you are setting up a Project Pages site and not using a custom
domain (i.e. your site's address is `username.github.io/repo-name`), then you need
to set `segmentCount` to `1` in the `public/404.html` file in order to keep `/repo-name` in the
path after the redirect.

Finally, make sure GitHub Pages option in your GitHub project settings is set to
use the gh-pages branch:

<img src="http://i.imgur.com/HUjEr9l.png" width="500" alt="gh-pages branch setting">

After all above setup is done, Travis CI should automatically deploy your site
after you push commit.
