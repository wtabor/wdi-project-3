//////
// don't mess with this file
// its not being used in live action code, but as a place holder to keep Will's "clean" code
// and my randon thing
//////

///////////////////////////
      <% prompts.forEach(function(prompt) { %>
        <a href="/prompts/<%= prompt._id %>">
          <i class="fa fa-file-text-o"></i><%= prompt.promptTheme + ' - ' + prompt.promptText %>
        </a>                  
      <% }) %>
///////////////////////////

///////////////////////////
<% stories.forEach(function(story) { %>        
  <a href="/stories/<%= story._id %>">
    <%= story.storyHook + ' - ' + story.storyText %>
  </a>                
<% }) %>
////////////////////////   
Story.find({})
                        .then(function(stories) {
                            console.log("USERS-story", stories[0].storyHook );
                            
                        }); /// closes off the story 
//////////////////////                           


// INDEX
router.get('/index', authenticate, function(req, res, next) {
    // var stories = global.currentUser.stories;
    // res.render('stories/index', { stories: stories, message: req.flash() });
    Story.find({})
        .then(function(stories) {
        
        /////////////////////////////////////////

            var max = stories.length;
            var min = 0;
            myRandomLocation(min,max);  

              function myRandomLocation(min,max) {
                  myValue = Math.floor(Math.random() * (max - min)) + min;
                  return myValue;
              };
            myPickedStory = stories[myValue];

            console.log("myStories -", stories[myValue]._id,  stories[myValue].storyHook);
            
            ////////////////////////////////
                        res.render('stories/index', { stories: stories, message: req.flash() });
        });
});

// ================================================================
// his working code
// ================================================================

// INDEX
router.get('/index', authenticate, function(req, res, next) {
    Story.find({})
        .then(function(stories) {
            var myTitle = "Stories Home";
            res.render('stories/index', {title: myTitle,  stories: stories, message: req.flash('Please log in') });
        });
});



// ================================================================
// my working home
// ================================================================
// GET Homepage
router.get('/', function(req, res, next) {
    var myTitle = "Welcome";
    
    function myObjectId(){
      var myCars = ["Opel", "Saab", "GMC", "Ford", "Honda", "Volvo", "BMW"];
      var max = myCars.length; 
      var min = 0;
      myRandomLocation(min,max);  

      function myRandomLocation(min,max) {
          myValue = Math.floor(Math.random() * (max - min)) + min;
          return myValue;
      };
      myPickedCar = myCars[myValue]; 
      // document.getElementById("demo1").innerHTML = myPickedCar;
      console.log("myPickedCar1", myPickedCar);
    };
    myObjectId();
    // console.log("myPickedCar2", myValue);
    
    myDisplayedCar = myPickedCar;

    res.render('index', { title: myTitle, myDisplayedData: myDisplayedCar, message: req.flash() }); 
});