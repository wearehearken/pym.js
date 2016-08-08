/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Load package config
    pkg: grunt.file.readJSON('package.json'),

    // Task configuration.
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        node: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        globals: {
          jQuery: true,
          requirejs: true,
        }
      },
      conf: [
        "Gruntfile.js",
        "bower.json",
        "package.json",
      ],
      pym: {
        options: {
          browser: true,
          predef: ['define']
        },
        src: "src/**/*.js",
      }
    },
    jsdoc: {
      api: {
        src: "<%= jshint.pym.src %>",
        options: {
          destination: "api"
        }
      }
    },
    preprocess:  {
      options: {
        context : {
          // Comment if we want autoinit to be stripped out
          AUTOINIT: true
        }
      },
      pym : {
        src : 'src/pym.js',
        dest : 'build/pym.js'
      },
    },
    concat: {
        options: {
          banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                  '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        pym: {
          src: ['build/pym.js'],
          dest: 'dist/pym-v<%= pkg.version %>.js'
        }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        background: true,
        singleRun: false
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      pym: {
        files: {
          'dist/pym-v<%= pkg.version %>.min.js': ['dist/pym-v<%= pkg.version %>.js']
        }
      }
    },
    watch: {
      jshint: {
        files: "<%= jshint.conf  %>",
        tasks: ["jshint"]
      },
      pym: {
        files: "<%= jshint.pym.src %>",
        tasks: ["jshint:pym"]
      },
      preprocess: {
        files: "<%= jshint.pym.src %>",
        tasks: ["preprocess:pym"]
      },
      concat: {
        files: "<%= concat.pym.src %>",
        tasks: ["concat:pym"]
      },
      karma: {
        files: ['app/js/**/*.js', 'test/browser/**/*.js'],
        tasks: ['karma:unit:run'] //NOTE the :run flag
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-jsdoc");
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-preprocess');
  grunt.loadNpmTasks('grunt-karma');

  // Default task.
  grunt.registerTask("default", ["jshint", "preprocess", "concat", "uglify", "jsdoc", "karma"]);
};
