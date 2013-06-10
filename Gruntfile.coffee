module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')

    uglify:
      options:
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      build:
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'

    copy:
      main:
        files: [
          { src: ['src/<%= pkg.name %>.js'], dest: 'build/<%= pkg.name %>.js' }
        ]

    cssmin:
      minify:
        expand: true
        cwd: 'src/'
        src: ['main.css']
        dest: 'src'
        ext: '.min.css'

    watch:
      scripts:
        files: ['src/*.js']
        tasks: ['copy', 'uglify', 'cssmin']


  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'default', ['copy', 'uglify', 'cssmin']