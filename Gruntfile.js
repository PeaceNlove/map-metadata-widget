module.exports = function (grunt) {
    'use strict';
    grunt.loadNpmTasks('grunt-sync');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-ts');
    var appDir = 'C:/Data/ArcGIS/arcgis-web-appbuilder-2.19/ArcGISWebAppBuilder/server/apps/2';
    var stemappDir = 'C:/Data/ArcGIS/arcgis-web-appbuilder-2.19/ArcGISWebAppBuilder/client/stemapp';
    grunt.initConfig({
        sync: {
            main: {
                verbose: true,
                files: [{
                        cwd: 'dist/',
                        src: '**',
                        dest: stemappDir
                    },
                    {
                        cwd: 'dist/',
                        src: '**',
                        dest: appDir
                    }]
            }
        },
        ts: { 'default': { 'tsconfig': { 'passThrough': true } } },
        watch: {
            main: {
                files: [
                    'widgets/**',
                    'themes/**'
                ],
                tasks: [
                    'clean',
                    'ts',
                    'copy',
                    'sync'
                ],
                options: {
                    spawn: false,
                    atBegin: true,
                    livereload: true
                }
            }
        },
        copy: {
            'main': {
                'src': [
                    'widgets/**/**.html',
                    'widgets/**/**.json',
                    'widgets/**/**.css',
                    'widgets/**/images/**',
                    'widgets/**/nls/**',
                    'themes/**/**.html',
                    'themes/**/**.json',
                    'themes/**/**.css',
                    'themes/**/images/**',
                    'themes/**/nls/**',
                    'themes/**/layouts/**/*.*'
                ],
                'dest': 'dist/',
                'expand': true
            }
        },
        clean: { 'dist': { 'src': 'dist/*' } }
    });
    grunt.registerTask('default', ['watch']);
};