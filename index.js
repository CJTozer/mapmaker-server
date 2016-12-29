#!/usr/bin/env node
/* jshint esversion: 6 */
"use strict";

const chalk = require("chalk");
const http = require('http');
const MapMaker = require('map-maker');

// Port - @@@ Don't override if provided by ENV.
const PORT=5000;

//We need a function which handles requests and send response
function handleRequest(request, response){
  switch (request.method) {
    case "POST":
      // @@@ Do the work here...
      request.on('data', (chunk) => {
        console.log(`Received data: ${chunk}`);
        response.end("Done + chunk");
      });
      break;
    default:
      // Not expected - error.
      console.log(chalk.bold.red(`Unexpected request: ${request.method} for ${request.url}`));
      response.statusCode = 404;
      response.end("mapmaker-server only accepts POST requests");
      break;
  }
}

// Create and start a server.
http.createServer(handleRequest).listen(PORT, function(){
  console.log(chalk.bold.green(`mapmaker-server listening on port ${PORT}`));
  MapMaker.test();
});
