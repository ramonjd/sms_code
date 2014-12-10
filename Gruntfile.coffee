module.exports = (grunt)->
  grunt.initConfig(
    pkg: grunt.file.readJSON('package.json')
    # task definitions
    copy:
      dev:
        files: [
          {
            expand:true
            filter:'isFile'
            flatten:true
            src: ['bower_components/angular/angular.min.js',
                  'bower_components/angular-route/angular-route.min.js']
            dest: 'public/js/vendor'
          }
        ],
    clean:
      dev: ['public/js/vendor', 'public/views']
    jade:
      partials:
        options:
          data:
            debug: true
        files:
          'public/views/form.tpl.html' : 'app/views/partials/form/index.jade'
          'public/views/reset.tpl.html' : 'app/views/partials/reset/index.jade'
    shell:
      bowerinstall:
        command: 'bower install'
      runserver:
        command: 'node server.js'
      test:
        command: 'jasmine-node app/'
    karma:
      unit:
        configFile: 'config/karma.conf.js'
    open:
      dev:
        path: 'http://localhost:3000'
    )
  
  
  # load modules
  grunt.loadNpmTasks 'grunt-shell'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-karma'
  grunt.loadNpmTasks 'grunt-contrib-jade'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-open'
  
  # register tasks
  grunt.registerTask 'deploy', [
    'shell:bowerinstall',
    'clean:dev',
    'copy:dev',
    'clean:dist',
    'copy:dist'
  ]
  grunt.registerTask 'testServer', ['shell:test']
  grunt.registerTask 'testClient', ['setup', 'karma']
  grunt.registerTask 'test', ['karma', 'shell:test']
  grunt.registerTask 'setup', [
    'clean:dev',
    'copy:dev',
    'jade:partials'
  ]

  # run tests then run server (no bower install)
  grunt.registerTask 'server', ['setup', 'test', 'shell:runserver']
  
  #get project ready and run server
  grunt.registerTask 'default', [
    'shell:bowerinstall',
    'setup',
    'test',
    'open:dev',
    'shell:runserver']
  
  # return grunt
  grunt