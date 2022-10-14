'use strict';

const issue_controller = require('../controllers/issue.controller');

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(issue_controller.issue_view_get)
    
    .post(issue_controller.issue_create_post)
    
    .put(issue_controller.issue_update_put)
    
    .delete(issue_controller.issue_remove_delete);
    
};
