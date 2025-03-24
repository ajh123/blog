#!/bin/sh

# Skip dirty check if running in GitHub Actions
if [ -z "$GITHUB_ACTIONS" ] && [ "`git status -s`" ]
then
    echo "The working directory is dirty. Please commit any pending changes."
    exit 1;
fi

echo "Deleting old publication"
rm -rf public
mkdir public
git worktree prune
rm -rf .git/worktrees/public/

echo "Creating gh-pages branch if it doesn't exist"
if ! git show-ref --verify --quiet refs/remotes/origin/gh-pages; then
    echo "Creating gh-pages branch"
    git checkout --orphan gh-pages
    git reset --hard
    git commit --allow-empty -m "Initial gh-pages commit"
    git push origin gh-pages
    git checkout main
fi

echo "Checking out gh-pages branch into public"
git worktree add -B gh-pages public origin/gh-pages

echo "Removing existing files"
rm -rf public/*

echo "Generating site"
env HUGO_ENV="production" hugo -t github-style

echo "Updating gh-pages branch"
cd public && git add --all && git commit -m "Publishing to gh-pages (publish.sh)"

echo "Pushing to github"
if [ -n "$GITHUB_TOKEN" ]; then
    git push "https://${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git" gh-pages
else
    git push origin gh-pages
fi