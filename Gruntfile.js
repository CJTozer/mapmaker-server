#!/usr/bin/env node

/* jshint esversion: 6 */
'use strict';

module.exports = function( grunt ) {
  grunt.initConfig( {
    eslint: {
      options: {
        configFile: '.eslintrc.yaml',
        fix: true,
      },
      src: [ '.' ],
    },
    jshint: {
      files: [
        'index.js',
        'Gruntfile.js',
      ],
      options: {
        reporter: require( 'jshint-stylish' ),
        jshintrc: '.jshintrc',
      },
    },
    jsonlint: {
      files: {
        src: [
          'package.json',
          '.jshintrc',
        ],
      },
    },
    watch: {
      files: [ '<%= jshint.files %>' ],
      tasks: [ 'eslint' ],
      options: {
        spawn: false,
      },
    },
  } );

  grunt.loadNpmTasks( 'gruntify-eslint' );
  grunt.loadNpmTasks( 'grunt-contrib-jshint' );
  grunt.loadNpmTasks( 'grunt-jsonlint' );
  grunt.loadNpmTasks( 'grunt-esdoc' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );

  grunt.registerTask( 'default', [ 'lint' ] );

  grunt.registerTask( 'lint', [ 'eslint', 'jshint', 'jsonlint' ] );
  grunt.registerTask( 'doc', 'esdoc' );
  grunt.registerTask( 'docs-add', [ 'doc', 'gitadd:docs' ] );
  grunt.registerTask( 'test', 'mochaTest' );
};
