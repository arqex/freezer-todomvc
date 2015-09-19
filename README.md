Freezer TodoMVC
=====================

This is an example on how to use the awesome library [Freezer](https://github.com/arqex/freezer) to create a flux application.

The app is the well known todo react example from [todomvc.com](http://todomvc.com/) adapted to use Freezer.

It uses [React.js](https://facebook.github.io/react/), of course and the outstanding [react-hot-loader](https://github.com/gaearon/react-hot-loader) as a development server.

### Install and use

```
git clone https://github.com/arqex/freezer-todomvc
npm install
npm start
open http://localhost:3000
```

### Understanding it
The app is really simple and the comments should be enough to get the point. The entry point is [boot.js](https://github.com/arqex/freezer-todomvc/blob/master/src/boot.js), following the requires you will understand it in minutes.

All the React components are under [/ui](https://github.com/arqex/freezer-todomvc/tree/master/src/ui) folder.
