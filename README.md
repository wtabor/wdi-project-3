# Welcome to Project 3!


A simple kick-the-tires sample web application that demostrates use of NodeJS, ExpressJS and MongoDB built in one 5-day week as our team-based project 3 for WDI students at General Assembly ~ Atlanta in May 2016.

#### Your outlet for creative writing!
The sample app is a Create Writing site, where a user can find or write a writing Prompt, and then write a Story from the Prompt, while securely used CRUD (Create, Read, Update, and Delete) operations because of the Authentication and Authorization features from Passport, authentication middleware for Node.js.


## Installation


**STEPS for Installing**

1. `git clone URL`
2. Issue the CD command into the directory
3. `npm install`
4. `nodemon start`
5. and launch your browser to http://localhost:3000/

The live app lives over on our production Heroku server at: *<URL-link>*



## Usage

*TODO: Write better usage instructions*

With the browser window open, navagate to the homepage at /

The user can signup, login, create a prompt and then write a story and logout.


## Contributing
- Will Tabor
- Michael Gokey
- Carl Onsgard



## History

We wrote lots of sample routes, and tried embedding stories in prompts and prompts in users, much like a sample ToDo app might, but found we needed to Link, rather then embed our data. We had lots of samples and false turns to go down in the first 2 days.

### Version
1.0


## License

This project is licensed under the open-source public-domain MIT License.





----------

### Minimum Requirements
Our guidelines are;

1. Include sign up/log in functionality, with encrypted passwords & an authorization flow (**DONE**)
1. Have complete RESTful routes for at least one of your resources with GET, POST, PUT, PATCH, and DELETE (**DONE**)
1. Have at least 2 models (more if they make sense) – one representing someone using your application, and one that represents the main functional idea for your app (**DONE**)
1. Utilize an ORM to create a database table structure and interact with your relationally-stored data (**DONE**)
1. Include wireframes that you designed during the planning process (**DONE**)
1. Have semantically clean HTML and CSS (**DONE**)
1. Be deployed online and accessible to the public (**In-Process**)



### Planning
Our [Trello](https://trello.com/b/jOxDUXPN/project-3 "Our Trello board") board.

Our [Wireframes](https://github.com/wtabor/wdi-project-3/blob/master/documentation/wrireframedesigns.md "Our Wireframes page") page.

![](https://raw.githubusercontent.com/wtabor/wdi-project-3/master/documentation/images/erd.png)

Our ERD diagram 

### User Stories
[Link to User Stories Readme file](https://github.com/wtabor/wdi-project-3/blob/master/documentation/userstories.md)


###Models
-   User Model
-   Prompt Model
-   Story Model

###Features
  - Log in/Log out (**DONE**)
  - Authentication (**DONE**)
  - Authorization (**DONE**)
  - View Home without logging in (**DONE**)
  - Full CRUD with hidden editing

###Technologies
- Git and GitHub source control system
([steps we use as a team](https://github.com/wtabor/wdi-project-3/blob/master/documentation/git-steps.md))
- Heroku production server
- HTML5
- CSS3
 	- bootstrap
	- bootswatch
	- font-awesome
- Node.JS
  - Express.JS
  - debug
  - morgan
  - ejs
  - body-parser
  - passport
  - bcrypt-nodejs
  - cookie-parser
  - connect-flash
  - method-override
  - mongoose
- MongoDB





#### Define Variables
Placeholder for defining our variables

Do we need this?


### Todos

Things left for other iterative build cycles;

- Stuff
- Stuff
- Create an API
- Consume and API
- Add a Twitter feed to different Prompt Theme pages
- Stuff





