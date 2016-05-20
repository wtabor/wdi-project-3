var mongoose = require('mongoose');
// var Todo = require('./models/todo');
/////////
var User = require("./models/user")
var Prompt = require("./models/prompt")
var Story = require("./models/story")


mongoose.connect('mongodb://localhost/promptsDB');

// our script will not exit until we have disconnected from the db.
function quit() {
  mongoose.disconnect();
  console.log('\nQuitting!');
}

// a simple error handler
function handleError(err) {
  console.log('ERROR:', err);
  quit();
  return err;
}


console.log('removing old data...');
Prompt.remove({})
.then(function() {
  // console.log('old data removed');
  console.log('creating some new prompts...');
  // var groceries  = new Todo({ title: 'groceries',    completed: false });
  // var feedTheCat = new Todo({ title: 'feed the cat', completed: true  });
  var romancePrompt1 = new Prompt({promptTheme: "romance", promptText: "romantic story prompt 1"})
  var romancePrompt2 = new Prompt({promptTheme: "romance", promptText: "romantic story prompt 2"})
  var scifiPrompt1 = new Prompt({promptTheme: "scifi", promptText: "scifi story prompt 1"})
  var scifiPrompt2 = new Prompt({promptTheme: "scifi", promptText: "scifi story prompt 2"})


  return Prompt.create([romancePrompt1, romancePrompt2, scifiPrompt1, scifiPrompt2]);
})
.then(function(savedPrompts) {
  console.log('Just saved', savedPrompts.length, 'prompts.');
  return Prompt.find({});
})
.then(function(allPrompts) {
  console.log('Printing all prompts:');
  allPrompts.forEach(function(prompt) {
    console.log(prompt);
  });
  return Prompt.findOne({promptTheme: 'romance'});
})
.then(function(deleted) {
  return Prompt.find({});
})
.then(function(allPrompts) {
  console.log('Printing all prompts:');
  allPrompts.forEach(function(prompt) {
    console.log(prompt);
  });
  quit();
});
