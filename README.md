# Issue Tracker App

## Description

Lorem Ipsum Dolor Samet.

[Actions](#actions)
[Fields](#fields)
[Tests](#tests)
[Dev Flow](#dev-flow)

## Actions
- View issues on a project. ``GET``
- Create an issue on a project. ``POST``
- Update an issue on a project. ``PUT``
- Delete an issues on a project. ``DELETE``
## Fields
- Required:``issue_title`` Title of the project issue 
- Required:``issue_text`` Text related to the project issue 
- Required:``created_by`` Author of the project issue 
- Optional:``assigned_to`` Name of the person working on the issue 
- Optional:``status_text`` Status of the project issue 
## Tests
- **You can provide your own project, not the example URL.**
    ```
    ## URL
    https://petrylabs-issue-tracker.heroku.app/
    ```
- **You can send a POST request to /api/issues/{projectname} with form data containing the required fields issue_title, issue_text, created_by, and optionally assigned_to and status_text.**
    ```
    ## Endpoint
        POST /api/issues/api_test
    ## Request
        {
            issue_title, issue_text, creaate_by,
            assigned_to, status_text
        }
    ## Response
        {
            ...<submitted_fields>
        }
    ```
- **The POST request to /api/issues/{projectname} will return the created object, and must include all of the submitted fields. Excluded optional fields will be returned as empty strings. Additionally, include created_on (date/time), updated_on (date/time), open (boolean, true for open - default value, false for closed), and _id.**
    ```
    ## Endpoint
        POST /api/issues/api_test
    ## Request
        {
            ...<post_fields>
        }
    ## Response
        {
            ...<submitted_fields>,
            assigned_to: '',
            status_text: '',
            created_on: "2022-08-26T00:11:28.759Z",
            updated_on: "2022-08-26T00:11:28.759Z",
            open: false
        }
    ```
- **If you send a POST request to /api/issues/{projectname} without the required fields, returned will be the error ``{ error: 'required field(s) missing' }``**
    ```
    ## Endpoint
        POST /api/issues/api_test
    ## Request
        {
            <missing_required_fields>
        }
    ## Response
        {
            error: "required field(s) missing"
        }
    ```
- **You can send a GET request to /api/issues/{projectname} for an array of all issues for that specific projectname, with all the fields present for each issue.**
    ```
    ## Endpoint
        GET /api/issues/api_test
    ## Response
        [
            {...}, {...}, {...}
        ]
    ```
- **You can send a GET request to /api/issues/{projectname} and filter the request by also passing along any field and value as a URL query (ie. /api/issues/{project}?open=false). You can pass one or more field/value pairs at once.**
  ```
  ## Endpoint
    GET /api/issues/{project}?open=false
  ## Response
    [
        {...}, {...}, {...}
    ]
  ```
- **You can send a PUT request to /api/issues/{projectname} with an _id and one or more fields to update.**
  - On success, the updated_on field should be updated, and returned should be {  result: 'successfully updated', '_id': _id }.
    ```
    ## Endpoint
        PUT /api/issues/api_test
    ## Request
        {
            _id: "<issue_id>"
        }
    ## Response
        {
            result: "successfully updated",
            _id: "<issue_id>"
        }
    ```
- **When the PUT request sent to /api/issues/{projectname} does not include an _id, the return value is { error: 'missing _id' }.**
    ```
    ## Endpoint
        PUT /api/issues/api_test
    ## Request
    {
        <_id field missing>
        ...
    }
    ## Response
    {
        error: "missing _id"
    }
    ```  
- **When the PUT request sent to /api/issues/{projectname} does not include update fields, the return value is { error: 'no update field(s) sent', '_id': _id }.**
  - On any other error, the return value is { error: 'could not update', '_id': _id }.
    ```
    ## Endpoint
        PUT /api/issues/api_test
    ## Request
        {
            _id: <issue_id>,
            ...<update_fields>
        }
    ## Response (Failure: No update fields)
        {
            result: "no update field(s) sent",
            _id: <issue_id>
        }
    ## Response (Failure: Any other error)
        {
            result: "could not update",
            _id: <issue_id>
        }
    ```
- **You can send a DELETE request to /api/issues/{projectname} with an _id to delete an issue.**
  - If no _id is sent, the return value is { error: 'missing _id' }. 
  - On success, the return value is { result: 'successfully deleted', '_id': _id }.
  - On failure, the return value is { error: 'could not delete', '_id': _id }.
    
    ```
    ## Endpoint
        DELETE /api/issues/api_test
    ## Request
        {
            _id: <issue_id>
        }
    ## Response (Success)
        {
            result: "successfully deleted",
            _id: <issue_id>
        }
    ## Response (Failure: Missing _id)
        {
            error: "missing _id",
            _id: <issue_id>
        }
    ## Response (Failure: Invalid _id)
        {
            result: "could not delete",
            _id: <issue_id>
        }
    ```

#Dev Flow
- **Project Preparation**
  - Read through challenge description [view](https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/issue-tracker)
  - Check out example project [view](https://issue-tracker.freecodecamp.rocks/)
- **Initial Setup**
  - Clone repo with boilerplate code [view](https://github.com/freeCodeCamp/boilerplate-project-issuetracker/) ``git clone``
  - Install project dependencies ``npm install``
  - Install nodedemon for hot reloading
- **Requirement Analysis**
  - Create readme file with project details
  - Start working through functional tests
- **Execution**
  - Create database connection
  - Create models folder with issue schema in it
  - Create controllers folder with issue controller in it
- **Testing**
  - Implement functional tests to ensure GET, POST, PUT & DELETE endpoints are working as expected
  - Work on the  POST functionality, modify the POST controller to take in form data and insert it into DB
    - moongose.Save()
  - Work on the GET functionality by taking in the incoming request parameters and running a find statement on the issue model to find docs in the DB
    - moongose.Find()
  - Work on the PUT functionality by taking 
    - Take response body, convert into entries map, filter out blank or empty properties, re-create object and pass in as update object to findOneAndUpdate function
    - mongoose.findOneAndUpdate
  - Work on the DELETE functionality
    - mongoose.delete
  - Error Handling
    - Next, Return, res.status(500) 