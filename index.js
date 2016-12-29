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
      request.on('data', (chunk) => {
        console.log(`Received data: ${chunk}`);
        var mm = new MapMaker()
          .spec(JSON.parse(chunk))
          .onError((err) => {
            console.log(chalk.bold.red(err));
            response.statusCode = 404;
            response.end(err);
          })
          .onSuccess((data) => {
            response.end(data);
          });
        mm.build_map();
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
  process.env.debug = true; // @@@ For now...
  console.log(chalk.bold.green(`mapmaker-server listening on port ${PORT}`));
});
