/*
 * fdm-init-h5app
 *
 * Copyright (c) 2013 chunterg
 * Licensed under the MIT license.
 */

'use strict';

// Basic template description.
exports.description = 'Create a H5app project';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'Start tip';

// Template-specific notes to be displayed after question prompts.
exports.after = 'Finish tip';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({type: 'h5app'}, [
    // Prompt for these values.
    init.prompt('appname','app'),
  ], function(err, props) {

    props.keywords = [];
    props.node_version = '>= 0.8.0';
    props.dependencies = {
       'fdm-html2js': '~0.1.1',
       "connect-modrewrite": "~0.6.3-pre"
    }
    props.devDependencies = {
        "grunt-contrib-watch": "~0.4.0",
        "grunt": "~0.4.2",
        "grunt-open": "~0.2.3",
        "grunt-contrib-less": "~0.10.0",
        "grunt-contrib-copy": "~0.5.0",
        "grunt-contrib-clean": "~0.4.1",
        "grunt-contrib-connect": "~0.6.0",
        "connect-livereload": "~0.3.2",
        "mime": "~1.2.0",
        "iconv-lite": "~0.2.11"
    }
    // Files to copy (and process).
    var files = init.filesToCopy(props);


    // Actually copy (and process) files.
    init.copyAndProcess(files, props, {noProcess: 'libs/**'});

    // Generate package.json file, used by npm and grunt.
    init.writePackageJSON('package.json', props);

    // All done!
    done();
  });

};
