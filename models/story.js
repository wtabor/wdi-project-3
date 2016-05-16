var mongoose = require('mongoose');
var User   = require('./user');
var Prompt    = require('./prompt');

/// Schema configuration
var StorySchema = new mongoose.Schema({
    // user_id:   { type: String, required: true },
    // prompt_id: { type: String, required: true },
    storyText: { type: String, required: true, maxLength: 2000 },
    storyHook: { type: String, required: true }
    }, { timestamps: true } // createdAt, updatedAt
);

var maxlength = [9, 'Your story `{storyText}` (`{VALUE}`) exceeds the maximum allowed length ({MAXLENGTH}).'];


///
function date2String(date) {
    var options = {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
}

StorySchema.methods.getCreatedAt = function() {
    return date2String(this.createdAt);
};

StorySchema.methods.getUpdatedAt = function() {
    return date2String(this.updatedAt);
};


module.exports = mongoose.model('Story', StorySchema);

