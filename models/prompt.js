var mongoose = require('mongoose');

var PromptSchema = new mongoose.Schema({
        hook: { type: String, required: true },
        theme: { type: String, required: true }
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

PromptSchema.methods.getCreatedAt = function() {
    return date2String(this.createdAt);
};

PromptSchema.methods.getUpdatedAt = function() {
    return date2String(this.updatedAt);
};

module.exports = mongoose.model('Prompt', PromptSchema);

