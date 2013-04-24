enyo-mvc-app
============
[Enyo MVC (Model View Controller)](https://github.com/enyojs/enyo/wiki/Enyo-MVC-Intro) is a JavaScript framework leveraging opensource Enyo 2 and including a framework based on Backbone.js.

Based on the [Enyo MVC Bootplate](https://github.com/enyojs/bootplate-mvc), the goal of this project is to create a simple login front end for a website. Some of the features needed will include:

- User account creation
- Password recovery
- Settings page
- Database integration

# Quick Start
## REST Server
<a href="https://github.com/pcimino/nodejs-restify-mongodb" target="_blank">Download and set up this REST server project</a> which requires Nodejs and MongoDB. This runs on port 3000, you can verify the server is running and test some of the REST APIs by navigating to <a href="http://localhost:3000" target="_blank">http://localhost:3000</a>.

## Enyo App
Clone this repository and go to the home directory.

1. Pull the required submodules  
1.1 git submodule update --init --recursive 
2. Run the Node setup script
2.1 (TBD)
3. Build the Enyo application
3.1 (TBD)
4. Start the REST Server
4.1 Navigate to nodejs-restify-mongodb/  
4.2 scripts/start-mongo[.bat | .sh]  
4.3 scripts/start-node[.bat | .sh]   
5. Start the Enyo application server
5.1 (TBD)
6. Navigate to the Enyo app in your browser on port 8080
6.1 <a href="http://localhost:8080" target="_blank">http://localhost:8080</a>

# [Project Wiki](https://github.com/pcimino/enyo-mvc-app/wiki)
[More detailed walk through for this app is here.](https://github.com/pcimino/enyo-mvc-app/wiki). Much easier to follow than sticking everything in the README.
