var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

/// Schema configuration
var StorySchema = new mongoose.Schema({
        user:   { type: ObjectId, ref: 'User', required: true },
        prompt: { type: ObjectId, ref: 'Prompt', required: true },
        storyText: { type: String, required: true, maxLength: 2000 },
        storyHook: { type: String, required: true },
        promptText:{type: String}
    }, { timestamps: true } // createdAt, updatedAt
);

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
