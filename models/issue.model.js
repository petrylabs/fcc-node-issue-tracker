const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IssueSchema = new Schema({
    // Required
    project: {
        type: String,
        required: true
    },
    issue_title: {
        type: String,
        required: true
    },
    issue_text: {
        type: String,
        required: true
    },
    created_by: {
        type: String,
        required: true
    },
    // Optional
    assigned_to: {
        type: String,
        required: false,
        default: ''
    },
    status_text: {
        type: String,
        required: false,
        default: ''
    },
    // System
    created_on: {
        type: String,
        required: true
    },
    updated_on: {
        type: String,
        required: true
    },
    open: {
        type: Boolean,
        required: true,
        default: true
    }
});

IssueSchema.pre('save', (next) => {
    //console.log('saving created on');
    next();
})

IssueSchema.methods.logThis = function() {
    console.log('This is a reference to the instance', this);
}

IssueSchema.statics.logModel = function() {
    console.log('this is a reference to the model', this);
}

module.exports = mongoose.model('Issue', IssueSchema);