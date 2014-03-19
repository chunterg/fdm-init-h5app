'use strict';

var mime = require('mime');
var path = require('path');
var fs = require('fs');
var LIVERELOAD_PORT = 35728;
var SERVER_PORT = 80;
var ENCODE = 'utf8';
var iconv = require('iconv-lite');
var _path = {
    css:'src/css',
    js:'src/js',
    tpl:'src/tpl'
}
var modRewrite = require('connect-modrewrite');
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        
        connect: {
            options: {
                port: SERVER_PORT,
                hostname: '0.0.0.0',
            },
            livereload: {
                options: {
                    middleware: function(connect,options) {
                        var content='';
                        var rules = [];
                        // 当前应用(m目录)转发到本地src
                        rules.push('^/{%= appname %}(.*)$ /src$1 [L]');
                        // fdevlib转发到线上
                        rules.push('^/fdevlib(.*)$ http://110.75.196.23/fdevlib$1 [P]');
                        // 其它转发到线上
                        rules.push('^(.*).(css|js)(.*)$ http://110.75.196.23$1.$2$3 [P]');

                        return [
                            modRewrite(rules),
                            function(req, res, next){
                                res.setHeader('Access-Control-Allow-Origin', '*');
                                if(ENCODE=='gbk'){
                                    var filepath = req.url.replace(/\?.*$/, '');
                                    var ct = mime.lookup(filepath);
                                    req.fileext = path.extname(filepath);
                                    if (ENCODE) {
                                        ct = ct +';charset='+ENCODE;
                                    }
                                    res.setHeader('Content-Type', ct);
                                    if(['.htm', '.html'].indexOf(req.fileext)!==-1){
                                        
                                        content = require('fs').readFileSync('.'+filepath);
                                        content = iconv.decode(content, ENCODE);
                                        // livereload 针对gbk hack
                                        // if(options.livereload){
                                            var src = "' + (location.protocol || 'http:') + '//' + (location.hostname || 'localhost') + ':" + LIVERELOAD_PORT + "/livereload.js?snipver=1";
                                            var snippet = "\n<script type=\"text/javascript\">document.write('<script src=\"" + src + "\" type=\"text/javascript\"><\\/script>')</script>\n";
                                            content = content.replace(/<\/body>/, function(w) {
                                              return snippet+w;
                                            });
                                        // }
                                        content = iconv.encode(content, ENCODE);
                                        res.end(content);
                                        // next(); 
                                    }else{
                                        next();    
                                    } 

                                }else{
                                     next();  
                                }
                                
                            },
                            require('connect-livereload')({
                                port:LIVERELOAD_PORT
                            }),

                            connect.static(path.resolve('.')),
                            connect.directory(path.resolve('.'))
                        ];
                    }
                }
            }
        },
        configureRewriteRules: {
            options: {
                rulesProvider: 'connect.rules'
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },
        watch: {
            options: {
                livereload: LIVERELOAD_PORT
            },
            style: {
                files: [
                    'src/js/**/*.js',
                    'demo/**/*.html',
                    'src/css/**/*.css',
                ],
            },
            template: {
                files: ['src/tpl/**/*.html'],
                tasks: ['html2js:dev'],
                options: {
                    nospawn: true
                },
            },
            less:{
                files: ['src/css/**/*.less'],
                tasks: ['less:dev'],
            }
        },
        less: {
            dev:{
                options: {
                    paths: [_path.css],
                },
                files:[
                    {
                      expand: true, 
                      cwd: _path.css,
                      src: ['**/*.less'], 
                      dest: _path.css,   
                      ext: '.css',   
                    }
                ],
            },
            online: {
                options: {
                    paths: [_path.css]
                },
                files: [
                    {
                      expand: true,     
                      cwd: _path.css,      
                      src: ['**/*.less'], 
                      dest: _path.css,   
                      ext: '.css',   
                    },
                  ],
            },
        },
        html2js: {
            dev: {
                options: {
                    encoding: ENCODE,
                    compress: true,
                    type:'amd',
                    modBase:'view'
                },
                dest: 'src/js/view/',
                src: 'src/tpl/**/*.html',
            },
        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: _path.js,
                        dest: 'build/js/',
                        src: [
                            '**/*.js'
                        ]
                    },
                    {
                        expand: true,
                        cwd: _path.css,
                        dest: 'build/css/',
                        src: [
                            '**/*.css'
                        ]
                    }
                ]
            }
        },
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('fdm-html2js');



    grunt.event.on('watch', function(action, filepath) {
        grunt.config('html2js.dev.src', filepath);
        grunt.config('less.dev.files', [
                        {
                          expand: true,     
                          src: [filepath], 
                          ext: '.css',   
                        }
                    ]);
    });
    grunt.registerTask('server', 
        [
        'connect:livereload', 
        'open', 
        'watch'
        ]);

    // Default task.
    grunt.registerTask('build', ['less:online','html2js','copy']);


};