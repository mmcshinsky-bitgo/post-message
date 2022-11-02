# postMessage between apps

A simple demonstration of sending messages between apps via iframes.

Uses default [express generator](https://expressjs.com/en/starter/generator.html) from express documentation for initial structure.

Core logic can be found in:
* `parent/public/javascripts/scripts.js`
* `child/public/javascripts/scripts.js`

## Installation

1. git clone the repository
2. cd into the root of project 

```sh
npm install
```

To run the parent and child servers:

```sh
npm start
```

Open a new browser tab at [http://127.0.0.1:3000/](http://127.0.0.1:3000/)

## Actions

### Onload

1. Onload, the parent syncs with child to verify child is ready
2. Child sends sync successful to parent.

### Button click

1. Upon clicking the login button, the parent asks the child for authentication.
2. Child sets local access token
3. Child sends access token to parent.
4. Parent sets local access token.
5. Parent redirects to child.
6. Child checks for authentication.
7. Child shows authentication status.