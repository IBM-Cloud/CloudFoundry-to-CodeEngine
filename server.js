// Based on https://github.com/IBM/nodejs-cloudant and https://github.com/IBM-Cloud/get-started-node
//
// Small Node.js and Cloudant app to demonstrate Cloud Foundry to Code Engine migration.
// This is the Cloud Foundry edition of the code.
//

// load required modules
var express=require('express');
var bodyParser=require('body-parser');
var app = express();
var cfenv = require("cfenv");
const { IamAuthenticator } = require('ibm-cloud-sdk-core');
const { CloudantV1 } = require('@ibm-cloud/cloudant');


// enable parsing of http request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set the database name
const dbName = 'mydb';

// load local VCAP configuration  and service credentials if present
var vcapLocal;
try {
  vcapLocal = require('./vcap-local.json');
  console.log("Loaded local VCAP", vcapLocal);
} catch (e) { }

const appEnvOpts = vcapLocal ? { vcap: vcapLocal} : {}

// extract the Cloudant API key and URL from the credentials
const appEnv = cfenv.getAppEnv(appEnvOpts);
cloudant_apikey=appEnv.services['cloudantNoSQLDB'][0].credentials.apikey;
cloudant_url=appEnv.services['cloudantNoSQLDB'][0].credentials.url;

// establish IAM-based authentication
const authenticator = new IamAuthenticator({
  apikey: cloudant_apikey,
});

// create a new client
const cloudantClient = CloudantV1.newInstance({authenticator: authenticator,
  serviceUrl: cloudant_url});


  
// create mydb database if it does not already exist
cloudantClient.putDatabase({ db: dbName})
    .then(data => {
      console.log(dbName + ' database created');
    })
    .catch(error => {
      // ignore if database already exists
      if (error.status === 412) {
        console.log(dbName + ' database already exists');
      } else {
        console.log('Error occurred when creating ' + dbName +
        ' database', error.error);
      }
});
  

// add a new name or item with timestamp info for sorting
app.post("/api/names", function (req, res, next) {
  console.log('In route - addName');
  let name = {
    name: req.body.name,
    timestamp: req.body.timestamp,
  };

  return cloudantClient.postDocument({
    db: dbName,
    document: name,
  })
    .then(addedName => {
      console.log('Add name successful');
      return res.status(201).json({
        _id: addedName.id,
        name: addedName.name,
        timestamp: addedName.timestamp,
      });
    })
    .catch(error => {
      console.log('Add name failed');
      return res.status(500).json({
        message: 'Add name failed.',
        error: error,
      });
    });
});


// retrieve the existing names or items
app.get("/api/names", function (req, res, next) {
  console.log('In route - getNames');

  return cloudantClient.postAllDocs({
    db: dbName,
    includeDocs: true,
  })
    .then(allDocuments => {
      let fetchedNames = allDocuments.result;
      let names = [];
      let row = 0;
      fetchedNames.rows.forEach(fetchedName => {
        names[row] = {
          _id: fetchedName.id,
          name: fetchedName.doc.name,
          timestamp: fetchedName.doc.timestamp,
        };
        row = row + 1;
      });
      console.log('Get names successful');
      return res.status(200).json(names);
    })
    .catch(error => {
      console.log('Get names failed');
      return res.status(500).json({
        message: 'Get names failed.',
        error: error,
      });
    });
});


//serve static file (index.html, js, css)
app.use(express.static(__dirname + '/views'));

var port = process.env.PORT || 8080
app.listen(port, function() {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});
