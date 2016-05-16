var mongoose = require('mongoose');

var StorySchema = new mongoose.Schema({
        story_text: { type: String, required: true, maxLength: 2000 }
    }, { timestamps: true } // createdAt, updatedAt
);

var maxlength = [9, 'Your story `{story_text}` (`{VALUE}`) exceeds the maximum allowed length ({MAXLENGTH}).'];

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
