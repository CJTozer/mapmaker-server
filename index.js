#!/usr/bin/env node
/* jshint esversion: 6 */
'use strict';

const
  chalk = require( 'chalk' ),
  http = require( 'http' ),
  MapMaker = require( 'map-maker' ),
  // Port - @@@ Don't override if provided by ENV.
  PORT = 5000;

//We need a function which handles requests and send response
function handleRequest( request, response ) {
  switch ( request.method ) {
  case 'POST':
    request.on( 'data', ( chunk ) => {
      console.log( `Received data: ${chunk}` );
      new MapMaker()
          .spec( JSON.parse( chunk ) )
          .onError( ( err ) => {
            console.log( chalk.bold.red( err ) );
            response.statusCode = 404;
            response.end( err );
          } )
          .onSuccess( ( data ) => {
            response.end( data );
          } )
          .build_map();
    } );
    break;
  default:
      // Not expected - error.
    console.log( chalk.bold.red( `Unexpected request: ${request.method} for ${request.url}` ) );
    response.statusCode = 404;
    response.end( 'mapmaker-server only accepts POST requests' );
    break;
  }
}

// Create and start a server.
http.createServer( handleRequest ).listen( PORT, function() {
  // @@@ For now always use debug logging...
  process.env.debug = true;
  console.log( chalk.bold.green( `mapmaker-server listening on port ${PORT}` ) );
} );
