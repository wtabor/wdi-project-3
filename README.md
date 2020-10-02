# Welcome to Project 3!


A simple kick-the-tires sample web application that demostrates use of NodeJS, ExpressJS and MongoDB built in one 5-day week as our team-based project 3 for WDI students at General Assembly ~ Atlanta in May 2016.

#### Your outlet to express creative writing!
The sample app is a Create Writing site, where a user can find or write a writing Prompt, and then write a Story from the Prompt, while securely used CRUD (Create, Read, Update, and Delete) operations because of the Authentication and Authorization features from Passport, authentication middleware for Node.js.


### Installation


**STEPS for Installing**

1. `git clone URL`
2. Issue the CD command into the directory
3. `npm install`
4. `nodemon start`
5. and launch your browser to http://localhost:3000/

The live app lives over on our production Heroku server at: *<URL-link>*



### Usage

*TODO: Write better usage instructions*

With the browser window open, navigate to the homepage at /

The user can sign-up, log-in, create a prompt and then write a story and log-out.


### Contributing
- [Will Tabor](https://github.com/wtabor)
- [Michael Gokey](https://github.com/gokemon)
- [Carl Onsgard](https://github.com/Carlco15)



### History

We wrote lots of sample routes, and tried embedding stories in prompts and prompts in users, much like a sample ToDo app might, but found we needed to Link, rather then embed our data. We had lots of samples and false turns to go down in the first 2 days.

### Version
1.7.72


### License

This project is licensed under the open-source public-domain [WTFPL](http://en.wikipedia.org/wiki/WTFPL) License.


----------

## Minimum Requirements
Our [guidelines](https://github.com/ATL-WDI-Exercises/project-three-requirements) are;

1. Include sign up/log in functionality, with encrypted passwords & an authorization flow (**DONE**)
1. Have complete RESTful routes for at least one of your resources with GET, POST, PUT, PATCH, and DELETE (**DONE**)
1. Have at least 2 models (more if they make sense) – one representing someone using your application, and one that represents the main functional idea for your app (**DONE**)
1. Utilize an ORM to create a database table structure and interact with your relationally-stored data (**DONE**)
1. Include wireframes that you designed during the planning process (**DONE**)
1. Have semantically clean HTML and CSS (**DONE**)
1. Be deployed online and accessible to the public (**DONE**)
 [https://wdi-writing-prompts.herokuapp.com/](https://wdi-writing-prompts.herokuapp.com/ "https://wdi-writing-prompts.herokuapp.com/")




### Planning of the project. 

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
-  [Heroku production server](https://wdi-writing-prompts.herokuapp.com/ "https://wdi-writing-prompts.herokuapp.com/")
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


----------
## Necessary Deliverables ##

- A working web application, built by the whole team, hosted somewhere on the internet (**DONE**)
- A link to your hosted working app in the URL section of your Github repo (**DONE**)
- A team git repository hosted on Github, with a link to your hosted project, and frequent commits from every team member dating back to the very beginning of the project (**DONE**)
- A readme.md file with: 
	- Explanations of the technologies used (**DONE**)
	- A couple paragraphs about the general approach you took (*In-Progress*)
	- Installation instructions for any dependencies (**DONE**)
	- Link to your user stories – who are your users, what do they want, and why? (**DONE**) 
	- Link to your wireframes – sketches of major views / interfaces in your application (**DONE**)
	- Descriptions of any unsolved problems or major hurdles your team had to overcome (*In-Progress*)
	- Future vision for the project (*In-Progress*)



#### Define Variables
Placeholder for defining our variables

-   User and users; gives us `global.currentUser`, which in turn gives us access to `currentUser._id` and `currentUser.local.email`
-   Prompt and prompts; Prompts have `promptTheme` and `promptText`
-   Story and stories; Stories have `storyHook` and `storyText`
-   All pages have a `myTitle`


### Todos

Things left for other iterative build cycles;

- Create an **API** (*could work well with Prompts as an outward facing publicly accessible API*)
- Consume an external API such as pulling a twitter feed, based on the Prompt Theme you chose.
- Add a Twitter feed to different Prompt Theme pages
- Maybe change the background of main container for the Story Hook, based on the Prompt Theme. 

Things we could do with another day or two;

- Adding a form to the User, for adding PenName and then using the PenName, instead of just the email, as the users "handle", 
- Display the PenName on a displayed Story
- Use the PenName on the displayed Story as the link to the Users Show page, which shows the Prompts and Stories that this person has Created. 





