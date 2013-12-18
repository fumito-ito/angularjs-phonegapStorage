'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js'],
            options: {
                globalstrict: true,
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true,
                    expect: true,
                    it: true,
                    spyOn: true,
                    beforeEach: true,
                    angular: true,
                    inject: true,
                    descript: true,
                    $window: true,
                    $rootScope: true,
                    $q: true
                    }
                }
            },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %>*/ \n'
                },
            dist: {
                files: {
                    'dist/<%= pkg.name%>.min.js': 'src/phonegapStorage.js'
                    }
                }
            },
        watch: {
            build: {
                files: ['src/**/*.js', 'Gruntfile.js'],
                tasks: ['jshint', 'uglify'],
                options: {
                    spawn: false
                }
            }
        }
        });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', 'watch:build');
};
