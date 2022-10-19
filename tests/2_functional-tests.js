const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
const { expect } = require('chai');
const { response } = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    
    this.timeout(5000);

    const api_path = '/api/issues/';
    const test_data = {
        project: 'functional_tests_project',
        issues: [
            {
                // required
                issue_title: 'Functional_Test_1',
                issue_text: 'Create an issue with every field: POST request...',
                created_by: 'functional_test_scripts',
                // optional
                assigned_to: 'Functional tests scripts',
                status_text: 'In progress...'
            },
            {
                // required
                issue_title: 'Functional_Test_2',
                issue_text: 'Create an issue with only required fields: POST request...',
                created_by: 'functional_test_scripts'
            },
            {
                // missing required fields
                created_by: 'functional_test_scripts'
            }
        ]
    }

    suiteSetup( (done) => {
        // Before All 'Functional Tests'
        chai.request(server)
                .get(api_path + test_data.project)
                .end((err, res) => {
                    if(err)
                        throw Error(err);
                    // console.log('issues to delete?', Array.isArray(res.body), 'how many?' , res.body.length);
                    if(Array.isArray(res.body) && res.body.length > 0) {
                        res.body.map(item => {
                            chai.request(server)
                                .delete('/api/issues/' + test_data.project)
                                .send({_id: item._id})
                                .end((err, res) => {
                                    // console.log('delete', item.issue_title);
                                })
                        })
                    }
                    done();
                });
    });

    suite('POST Requests', function () {
        
        test('1. Create an issue with every field: POST request to ' + api_path + test_data.project, function (done) {
            chai.request(server)
                .post(api_path + test_data.project)
                .send(test_data.issues.at(0))
                .end(function(err, res) {
                    test_data.issues.at(0)._id = res.body._id;
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.nestedInclude(res.body, test_data.issues.at(0));
                    done();
                });
        });

        test('2. Create an issue with only required fields:  ' + api_path + test_data.project, function(done) {
            
            chai.request(server)
                .post(api_path + test_data.project)
                .send(test_data.issues.at(1))
                .end(function(err, res) {
                    const {created_on, updated_on, open, _id, status_text} = res.body;
                    test_data.issues.at(1)._id = _id;
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.nestedInclude(res.body, test_data.issues.at(1));
                    assert.property(res.body, 'created_on');
                    assert.isNumber(Date.parse(created_on));
                    assert.property(res.body, 'updated_on');
                    assert.isNumber(Date.parse(updated_on));
                    assert.property(res.body, 'open');
                    assert.isBoolean(open);
                    assert.isTrue(open);
                    assert.property(res.body, '_id');
                    assert.isNotEmpty(_id);
                    assert.property(res.body, 'status_text');
                    assert.isEmpty(status_text);
                    done();
                })
        });

        test('3. Create an issue with missing required fields: POST request to ' + api_path + test_data.project, function(done) {
        
            chai.request(server)
                .post(api_path + test_data.project)
                .send(test_data.issues.at(2))
                .end(function(err, res) {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.equal(res.body.error, 'required field(s) missing')
                    done();
                })
        });

    });

    suite('GET Requests', function () {

        test('4. View issues on a project: GET request to ' + api_path + test_data.project, function (done) {
            chai.request(server)
                .get(api_path + test_data.project)
                .end(function(err, res) {
                    assert.equal(res.status, 200);
                    assert.isArray(res.body);
                    assert.equal(res.body.length, 2);
                    res.body.map(item => {
                        assert.property(item, 'issue_title');
                        assert.property(item, 'issue_text');
                        assert.property(item, 'project');
                    })
                    done();
                })
        });

        test('5. View issues on a project with one filter: GET request to ' + api_path + test_data.project, function(done) {
            chai.request(server)
                .get(api_path + test_data.project + '?issue_title=Functional_Test_1')
                .end(function(err, res) {
                    assert.equal(res.status, 200);
                    assert.isArray(res.body);
                    assert.equal(res.body.length, 1);
                    assert.equal(res.body.at(0).issue_title, 'Functional_Test_1');
                    done();
                })
        });

        test('6. View issues on a project with multiple filters: GET request to ' + api_path + test_data.project, function(done) {
            chai.request(server)
                .get(api_path + test_data.project + '?created_by=functional_test_scripts&status=open')
                .end(function(err, res) {
                    assert.equal(res.status, 200);
                    assert.isArray(res.body);
                    assert.equal(res.body.length, 2);
                    assert.equal(res.body.at(0).created_by, 'functional_test_scripts');
                    assert.equal(res.body.at(0).open, true);
                    assert.equal(res.body.at(1).created_by, 'functional_test_scripts');
                    assert.equal(res.body.at(1).open, true);
                    done();
                })
        });

    });

    suite('PUT Requests', function () {

        test('7. Update one field on an issue: PUT request to ' + api_path + test_data.project, function(done) {
            const target = test_data.issues.at(0);
            const updates = {
                _id: target._id,
                issue_title: target.issue_title + '_MODIFIED'
            }
            chai.request(server)
                .put(api_path + test_data.project)
                .send(updates)
                .end(function(err, res) {
                    if(err)
                        throw err;
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.equal(res.body.issue_title, updates.issue_title);
                    assert.isAbove(
                        Date.parse(res.body.updated_on),
                        Date.parse(res.body.created_on)
                    )
                done();
            });
        });
        
        test('8. Update multiple fields on an issue: PUT request to /api/issues/{project}' + api_path + test_data.project, function (done) {
            const target = test_data.issues.at(1);
            const updates = {
                _id: target._id,
                issue_title: target.issue_title + '_MODIFIED',
                issue_text: target.issue_text + ' MODIFIED'
            }
            chai.request(server)
                .put(api_path + test_data.project)
                .send(updates)
                .end(function(err, res) {
                    if(err)
                        throw err;
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.equal(res.body.issue_title, updates.issue_title);
                    assert.equal(res.body.issue_text, updates.issue_text);
                done();
            });
        });
        
        test('9. Update an issue with missing _id: PUT request to /api/issues/{project}' + api_path + test_data.project, function (done) {
            const updates = {
                issue_title: 'Should not work',
                issue_text: 'Missing ID'
            }
            chai.request(server)
                .put(api_path + test_data.project)
                .send(updates)
                .end(function(err, res) {
                    if(err)
                        throw err;
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.equal(res.body.error, 'missing _id');
                done();
            });
        });
        
        test('10. Update an issue with no fields to update: PUT request to /api/issues/{project}' + api_path + test_data.project, function (done) {            
            const target = test_data.issues.at(1);
            const updates = {
                _id: target._id
            }
            chai.request(server)
                .put(api_path + test_data.project)
                .send(updates)
                .end(function(err, res) {
                    if(err)
                        throw err;
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.equal(res.body.error, 'no update field(s) sent');
                done();
            });
        });

        test('11. Update an issue with an invalid _id: PUT request to /api/issues/{project}' + api_path + test_data.project, function (done) {
            const updates = {
                _id: '1231231231djoijisjfoisjoifsdf',
                issue_title: 'Should not work',
                issue_text: 'Missing ID'
            }
            chai.request(server)
                .put(api_path + test_data.project)
                .send(updates)
                .end(function(err, res) {
                    if(err)
                        throw err;
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.equal(res.body.error, 'could not update');
                done();
            });
        });
    });

    suite('DELETE Requests', function(){

        test('12. Delete an issue: DELETE request to ' + api_path + test_data.project, function (done) {

            const filter = { 
                _id: test_data.issues.at(1)._id
            }
            chai.request(server)
                .delete(api_path + test_data.project)
                .send(filter)
                .end(function(err, res) {
                    if(err)
                        throw err;
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.equal(res.body.result, 'successfully deleted');
                    done();
                });
        });

        test('13. Delete an issue with missing _id: DELETE request to ' + api_path + test_data.project, function (done) {
            const filter = {
                // Empty
            }
            chai.request(server)
            .delete(api_path + test_data.project)
                .send(filter)
                .end(function(err, res) {
                    if(err)
                        throw err;
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.equal(res.body.error, 'missing _id');
                    done();
                });
        });

        test('14. Delete an issue with an invalid _id: DELETE request to ' + api_path + test_data.project, function (done) {
            const filter = {
                 _id: 'invalid_id_001'
            }
            chai.request(server)
                .delete(api_path + test_data.project)
                .send(filter)
                .end(function(err, res) {
                    if(err)
                        throw err;
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.equal(res.body.error, 'could not delete');
                    done();
                });
        });

    });
    
    suiteTeardown( (done) => {
        // After All 'Functional Tests'
        done();
    });
});
