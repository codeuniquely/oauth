Simple Javascript App
=====================

This is a simple JavaScrit app written in ES5 to run on node.js

Directory structure
===================
The importanyt files in the project are listed below:

```
root
  .vscode                  - config for debugging in 'visual studio' code
  .bin
    server                 - bash script to lauch the app called from package.json "scripts"
  controllers
    index.js               - configures controller and routes for project
    callback.js            - call bakc from OAuth (response handling)
    dashboard.js           - dashboard controller
    login.js               - logn controller
    logout.js              - logout controller
    secure.js              - controller to handle user profile / secure page content
  middleware
    auth.js                - authentication checks and redirects
    errors.js              - 404 and Exception handling
    passport.js            - handles all condfiguration for PassportJS and OAuth2Strategy
  public
    img
      logo.png             - 48px x 48px logo used by the plugin
    script
      jquery.feedback.js   - the jquery plugin applied / run after you login
    style
      style.css            - some simple form styles and styles for the plugin
    favicon.ico            - the project favicon
  views
    partials               - after you login I pull in a simple partial view into the profile page

  app.js                   - main application
  config.js                - configuration information for various parts of the app
```

Installing the Code
===================
The application makes use of various NPM packages, pulled in via the package.json in the project.
The assumption is that you are running a node v6.xx.xx (i was running 6.10.3) and npm 3.xx.xx
I was ruuning with 3.10.10
I was also running MacOS

To install the development environment, in the folder that you copied this code into, type:
```
npm install
```

Running the project
================================================
The project is started (by calling the bash script) with NodeMon, which also watches for file updates and restarts the project.
I have included a small utility script in package.json to make thsi call for you and its slghtly easier to get going.
The bash script basically runs app.js for you but also does a few house keeping checks for used sockets and ports

```
npm start
```


Connecting to the dashboard
===========================
The server runs on http://localhost:3000
The public dashboard can be loaded by directing your browsers to:

```
http://localhost:3000/dashboard
```

Developer Debugging
===================
I have also included the .vscode folder with the appropiate launch.json configuration
file to allow you to run and debug through the application using the Visual Studio Code
(other debugging/inspect options are available, use what you know best...)
