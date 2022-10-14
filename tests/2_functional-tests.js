const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    this.timeout(5000);
    test('Sending a GET request to endpoint /api/issues/{project} returns status=200, project=apitest and method=GET', function(done) {
        chai.request(server)
            .get('/api/issues/apitest')
            .end((err, res) => {
                if(err) {
                    console.error(err);
                }
                assert.equal(res.status, 200);
                assert.equal(res.body.project, 'apitest');
                assert.equal(res.body.method, 'GET');
                done();
            })
    })
    test('Sending a POST request to endpoint /api/issues/{project} returns status=200, project=apitest, method=POST', function(done) {
        chai.request(server)
            .post('/api/issues/apitest')
            .end((err, res) => {
                if(err) {
                    console.error(err);
                }
                assert.equal(res.status, 200);
                assert.equal(res.body.project, 'apitest');
                assert.equal(res.body.method, 'POST');
                done();
            })
    })
    test('Sending a PUT request to endpoint /api/issues/{project} returns status=200, project=apitest, method=PUT', function(done) {
        chai.request(server)
            .put('/api/issues/apitest')
            .end((err, res) => {
                if(err) {
                    console.error(err);
                }
                assert.equal(res.status, 200);
                assert.equal(res.body.project, 'apitest');
                assert.equal(res.body.method, 'PUT');
                done();
            })
    })
    test('Sending a DELETE request to endpoint /api/issues/{project} returns status=200, project=apitest, method=DELETE', function(done) {
        chai.request(server)
            .delete('/api/issues/apitest')
            .end((err, res) => {
                if(err) {
                    console.error(err);
                }
                assert.equal(res.status, 200);
                assert.equal(res.body.project, 'apitest');
                assert.equal(res.body.method, 'DELETE');
                done();
            })
    })
    // test('Create an issue with every field: POST request to /api/issues/{project}', function(done) {
    //     const post_data = {
    //         // required
    //         issue_title: 'issue_title_required_value',
    //         issue_text: 'issue_text_required_value',
    //         created_by: 'create_by_required_value',
    //         // optional
    //         assigned_to: 'assigned_to_optional_value',
    //         status_text: 'status_text_optional_value'
    //     }
    //     chai.request(server)
    //         .post('/api/issues/apitest')
    //         .send(post_data)
    //         .end(function(err, res) {
    //             assert.equal(res.status, 200);
    //             assert.equal(res.body.issue_title, post_data.issue_title);
    //             assert.equal(res.body.issue_text, post_data.issue_text);
    //             assert.equal(res.body.created_by, post_data.created_by);
    //             assert.equal(res.body.assigned_to, post_data.assigned_to);
    //             assert.equal(res.body.status_text, post_data.status_text);
    //             done();
    //         })
    // });
    // Create an issue with only required fields: POST request to /api/issues/{project}
    // Create an issue with missing required fields: POST request to /api/issues/{project}
    // View issues on a project: GET request to /api/issues/{project}
    // View issues on a project with one filter: GET request to /api/issues/{project}
    // View issues on a project with multiple filters: GET request to /api/issues/{project}
    // Update one field on an issue: PUT request to /api/issues/{project}
    // Update multiple fields on an issue: PUT request to /api/issues/{project}
    // Update an issue with missing _id: PUT request to /api/issues/{project}
    // Update an issue with no fields to update: PUT request to /api/issues/{project}
    // Update an issue with an invalid _id: PUT request to /api/issues/{project}
    // Delete an issue: DELETE request to /api/issues/{project}
    // Delete an issue with an invalid _id: DELETE request to /api/issues/{project}
    // Delete an issue with missing _id: DELETE request to /api/issues/{project}
});
