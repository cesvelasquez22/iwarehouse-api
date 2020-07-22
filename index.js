/*
Primary file for the API
*/
//Dependencies
var server = require('./lib/server');
const process = require('process');
//Declere the app
var app = {};


//Init function
app.init = function () {
    //Start the server
    server.init();

    // process.on('unhandledRejection', function (err) {
        
    // });

};

//Execute
app.init();

//Export the app
module.exports = app;