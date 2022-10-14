const { method } = require('../models/issue.model');
const Issue = require('../models/issue.model')

const issue_view_get = (req, res) => {
    const project = req.params.project;
    const method = req.method;
    res.json({
        method: method,
        project: project,
        error: 'Not yet implemented'
    });
}

const issue_create_post = (req, res) => {
    const project = req.params.project;
    const method = req.method;
    res.json({
        method: method,
        project: project,
        error: 'Not yet implemented'
    });
}

const issue_update_put = (req, res) => {
    const project = req.params.project;
    const method = req.method;
    res.json({
        method: method,
        project: project,
        error: 'Not yet implemented'
    });
}

const issue_remove_delete = (req, res) => {
    const project = req.params.project;
    const method = req.method;
    res.json({
        method: method,
        project: project,
        error: 'Not yet implemented'
    });
}

exports.issue_create_post = issue_create_post;
exports.issue_view_get = issue_view_get;
exports.issue_update_put = issue_update_put;
exports.issue_remove_delete = issue_remove_delete;
