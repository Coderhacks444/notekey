# GitHub Deployment Instructions

## Step 1: Create GitHub Repository
1. Go to https://github.com/new
2. Name your repository "notekey"
3. Make sure to keep it public (not private)
4. Don't initialize with a README, .gitignore, or license
5. Click "Create repository"

## Step 2: Connect Local Repository to GitHub
After creating the repository, run these commands in your terminal:

```bash
git remote add origin https://github.com/coderhacks444/notekey.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy to GitHub Pages
After pushing your code to GitHub, deploy your app with:

```bash
npm run deploy
```

## Step 4: Configure GitHub Pages
1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" section
4. Under "Source", select "gh-pages" branch and "/ (root)" folder
5. Click "Save"
6. Your app will be available at: https://coderhacks444.github.io/notekey