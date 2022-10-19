const { method } = require('../models/issue.model');
const Issue = require('../models/issue.model')
const mongoose = require('mongoose');
const objectId = mongoose.Types.ObjectId;

const relFields = 'project _id issue_title issue_text created_by created_on assigned_to status status_text updated_on open';

const issue_view_get = (req, res) => {
    const project = req.params.project;
    const filterQuery = req.query;
    Issue.find(Object.assign({}, {project: project}, filterQuery))
        .select(relFields)
        .exec((err, docs) => {
            if(err) {
                res.status(500).json(err);
                return;
            }
            res.json(docs);
        })
}       

const issue_create_post = (req, res, next) => {
    const project = req.params.project;
    const method = req.method;
    //const {issue_title, issue_text, created_by, assigned_to, status_text} = req.body;
    const newIssue = new Issue({
        project: project,
        issue_title: req.body.issue_title,
        issue_text: req.body.issue_text,
        created_by: req.body.created_by,
        assigned_to: req.body.assigned_to,
        status_text: req.body.status_text,
        created_on: new Date().toISOString(),
        updated_on: new Date().toISOString() 
    })
    newIssue.save((err, data) => {
        let resObj;
        if(err) {
            const pathRequiredRegex = new RegExp(/Path `\w+` is required/);
            resObj = {
                error: pathRequiredRegex.test(err.message)
                ? 'required field(s) missing'
                : err.message
            }
        } else {
            resObj = {
                project: data.project,
                _id: data._id,
                issue_title: data.issue_title,
                issue_text: data.issue_text,
                created_by: data.created_by,
                assigned_to: data.assigned_to,
                status_text: data.status_text,
                created_on: data.created_on,
                updated_on: data.updated_on,
                open: data.open 
            }
        }
        res.json(resObj);
    })
}

const issue_update_put = (req, res) => {
    const id = req.body._id;    

    if(!id) {
        res.status(200).json({'error': 'missing _id'}); 
        return;
    }

    req.body._id = undefined;

    const valid_fields = Object.entries(req.body)
        .filter(([key, val]) => val !== undefined);

    if(valid_fields.length < 1) {
        res.status(200).json({'error': 'no update field(s) sent', '_id': id});
        return;
    }

    const updates = Object.fromEntries(valid_fields);
    updates.updated_on = new Date().toISOString();

    console.log('test');

    Issue.findOneAndUpdate({_id: id}, updates, {new: true})
        .select(relFields)
        .exec((err, doc) => {
            if(err || !doc) {
                res.status(200).json( { 'error': 'could not update',  '_id': id } );
                return;
            }

            res.status(200).json({
                'result': 'successfully updated',
                _id: id
            });
            
    });
}

const issue_remove_delete = (req, res) => {
    
    const id = req.body._id;
    
    if(!id) {
        res.status(200).send( { 'error' : 'missing _id' } );
        return;
    }

    Issue.findByIdAndDelete( { _id: id } )
    .exec((err, doc) => {
        if(err || !doc) {
            res.status(200).json( { 'error': 'could not delete',  '_id': id } );
            return;
        }
        res.status(200).json({
            'result' : 'successfully deleted',
            '_id' : id 
        });
    });
}

exports.issue_create_post = issue_create_post;
exports.issue_view_get = issue_view_get;
exports.issue_update_put = issue_update_put;
exports.issue_remove_delete = issue_remove_delete;
