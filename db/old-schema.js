var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/prompts');
var db = mongoose.connection;


///
db.on('error', function(err){
  console.log(err);
});

db.once('open', function() {
  console.log("Connected to MongoDB!");
});
///



///
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId

var userSchema = new Schema({
  penName: String,
  email: String,
  password: String
});

var promptSchema = new Schema({
  user_id: String,
  promptTheme: String,
  promptText: String
});

var storySchema = new Schema({
  prompt_id: String,
  user_id: String,
  storyText: String,
  storyHook: String
});

// /// embed ReminderSchema into AuthorSchema
// var AuthorSchema = new Schema({
//   name: String,
//   reminders: [ReminderSchema]
// });
/// example of how to embed 




var userModel = mongoose.model("User", userSchema);
var promptModel = mongoose.model("Prompt", promptSchema);
var storyModel = mongoose.model("Story", storySchema);




/// standard module.exports
module.exports ={
  UserModel: UserModel,
  PromptModel: PromptModel,
  StoryModel: StoryModel
};