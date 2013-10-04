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
1.1 /scripts/update-git-modules[.sh|.bat]
2. Run the Node setup script
2.1 /scripts/install-npm-modules[.sh|.bat]
3. Build the Enyo application
3.1 (TBD)
4. Start the REST Server
4.1 Navigate to nodejs-restify-mongodb/  
4.2 scripts/start-mongo[.bat | .sh]  
4.3 scripts/start-node[.bat | .sh]   
5. Start the Enyo application server
5.1 (TBD)
6. Navigate to the Enyo app in your browser on port 8888
6.1 <a href="http://localhost:8080" target="_blank">http://localhost:8888</a>

# [Project Wiki](https://github.com/pcimino/enyo-mvc-app/wiki)
[More detailed walk through for this app is here.](https://github.com/pcimino/enyo-mvc-app/wiki). Much easier to follow than sticking everything in the README.

----

App structure
    MvcApp

Controller structure
    Routes : Handles navigation, such as between pages and controllers. Originally tried to break up into multiple Routers but only the last one would be recognized. So had to combine everything into one big route.

    PublicController : handles functionality when a user is not logged into the site
    AuthController: Handles functionality after authentication (priviledged functionality)

Views Structure
    The goal is to organize views and events. Originally a Controller and View were going to be a pair and used for functionality (i.e. user preference pages). However, the view is really a container for the content, still trying to figure out how/when/where it makes sense to compartmentalize content and functionality. One tricky thing (see below) is routing programatically: to keep the Routes controller from getting out of hand it is also broken up in to multiple pieces; when the programmer wants to re-route programmatically they need to know which router to use.

    PublicView : Maps to the PublicController, has a PublicHeader, PublicContent and PublicFooter. Initial content is the LoginContent.
    AuthView : Maps to the AuthController, has an AuthHeader, AuthContent and AuthFooter. Initial content is the HomeContent.

    Headers & Footers
        Not really defined at this time, other than recognizing 'Public' will have different Content than 'Auth'. The differences right now include minor text content and AuthHeader has a Gravatr image.

    Content : The views each have a 'bodyContainer' component. When content within the view switches, a the bodyContainer.destroyComponents() is called and a new body/content is instantiated and added
        LoginContent : Contains forms & events for logging the user into the site
        UserSignupContent : Allows user to create a new account
        ForgotPasswordContent : Allows user to reset password

Routing
    The Routes controller intercepts links and uses the appropriate handler. Navigation can be handled via linking:
        &lt;a href="#/logout"&gt;Logout&lt;/a&gt;
    or programitically:
        mvcApp.$.publicRoutes.trigger({location:'/login'})
