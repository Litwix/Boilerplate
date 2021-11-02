# Boilerplate Code

## Setup

Create a new git repository on your local machine using `git init`.
Add this boilerplate code as a remote and merge it into your repository:
```
git remote add boilerplate git@github.com:Litwix/Boilerplate.git
git fetch boilerplate
git merge boilerplate/main
```

## Customization

- Update the project name in `package.json`
- `npm install`
- Create your postgres database -- name should match name parameter that you just changed in `package.json`

## Scripts

- `npm run start-dev`: Will start your server and build your client side files using webpack
