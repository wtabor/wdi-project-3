var mongoose = require('mongoose')
// var conn = mongoose.connect('mongodb://localhost/reminders')
var Schema = require("../db/schema.js");

var UserModel = require("../models/user")
var PromptModel = require("../models/prompt")
var StoryModel = require("../models/story")


UserModel.remove({}, function(err){
  console.log(err)
})
PromptModel.remove({}, function(err){
  console.log(err)
})
StoryModel.remove({}, function(err){
  console.log(err)
})


////// Create some users
var carl = new UserModel({name: "carl"})
var will = new UserModel({name: "will"})
var michael = new UserModel({name: "michael"})

var prompt1 = new PromptModel({body: "story prompt 1"})
var prompt2 = new PromptModel({body: "story prompt 2"})


var story1 = new StoryModel({body: "story body 1 The night was dark and..."})
var story2 = new StoryModel({body: "story body 2 Cold water envloped...."})

var users = [carl, will, michael]
var prompts = [prompt1, prompt2]
var storys = [story1, story2]


for(var i = 0; i < users.length; i++){
  users[i].prompts.push(prompts[i], prompts[i+3])
  
  users[i].save(function(err){
    if (err){
      console.log(err)
    }else {
      console.log("user was saved")
    }
  })
}