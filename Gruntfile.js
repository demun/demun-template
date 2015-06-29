module.exports = function (grunt) {
// npm i -D grunt grunt-autoprefixer grunt-concurrent grunt-contrib-clean grunt-contrib-concat grunt-contrib-connect grunt-contrib-copy grunt-contrib-csslint grunt-contrib-cssmin grunt-contrib-imagemin grunt-contrib-jshint grunt-contrib-less grunt-contrib-uglify grunt-contrib-watch grunt-include-replace grunt-newer grunt-notify grunt-prettify grunt-usemin grunt-wiredep jshint-stylish load-grunt-tasks time-grunt 

  'use strict';

  // Time how long tasks take. Can help when optimizing build times
  // 작업시간 표시
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  // 자동으로 grunt 태스크를 로드합니다. grunt.loadNpmTasks 를 생략한다.
  require('load-grunt-tasks')(grunt);

  // Configurable paths
  var appConfig = {
      // app: 'SourceCode',
      // dist: 'FinishCode',
      app: 'app',
      dist: 'dist',
      gruntfile: 'gruntConfig'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // Project settings
    config: appConfig,

    clean: {
      dist: {
        files: [{
          dot: true,
          // nonull: true,
          src: [
            '.tmp/*',
            '<%= config.dist %>'
          ]
        }]
      },
      server: '.tmp'
    },

// usemin confif
    useminPrepare: {
      options: {
        dest: '<%= config.dist %>'
      },
      html: ['<%= config.app %>/index.html']
    },

    usemin: {
      options: {
        assetsDirs: '<%= config.dist %>'
      },
      html: ['<%= config.dist %>/{,*/}*.html'],
      css: ['<%= config.dist %>/css/{,*/}*.css']
    },
    
// css task
    less: {
        dist: {
            src: '<%= config.app %>/less/style.less',
            dest: '.tmp/css/style.css'
        }
    },
    csslint: {
        options: {
            csslintrc: 'gruntConfig/.csslintrc'
        },
        dist: {
            src: '.tmp/css/style.css'
        }
    },
    autoprefixer: {
         options: {
            browsers: [
                'Android 2.3',
                'Android >= 4',
                'Chrome >= 20',
                'Firefox >= 24', // Firefox 24 is the latest ESR
                'Explorer >= 8',
                'iOS >= 6',
                'Opera >= 12',
                'Safari >= 6'
            ]
        },
        dist: {
            src: '.tmp/css/{,*/}*.css'
        }
    },
    csscomb: {
        options: {
            config: 'gruntConfig/.csscomb.json'
        },
        dist: {
            src: '.tmp/css/style.css',
            dest: '.tmp/css/style.css'
        }
    },
    cssmin: {
        options: {
            compatibility: 'ie8',
            keepSpecialComments: 1,
            // default - '!'가 붙은 주석은 보존,
            // 1 - '!'가 붙은 주석 중 첫번째 주석만 보존
            // 0 - 모든 주석 제거
            // noAdvanced: true,
        },
        // dist: {
        //     src: '.tmp/css/style.css',
        //     dest: '.tmp/css/style.min.css',
        // }
    },

    includereplace: {
        dist: {
            options: {
                includesDir: '<%= config.app %>/html/include/',
                globals: {
                  title: 'demun-template-test'
                }
            },
            files: [
                {
                    expand: true,
                    cwd: '<%= config.app %>/html/docs/',
                    src: '**/*.html',
                    dest: '<%= config.dist %>/'
                }
            ],
        }
    },
    prettify: {
        options: {
            'indent': 4,
            'condense': true,
            'indent_inner_html': true,
            'unformatted': [
                'a',
                'pre'
            ]
        },
        dist: {
            expand: true,
            cwd: '<%= config.dist %>/',
            ext: '.html',
            src: ['**/*.html'],
            dest: '<%= config.dist %>/'
        },
    },

// js task
    jshint: {
        options: {
            jshintrc: '<%= config.gruntfile %>/.jshintrc',
            reporter: require('jshint-stylish')
        },
        all: [
            'Gruntfile.js',
            '<%= config.app %>/js/{,*/}*.js',
            '!<%= config.app %>/js/lib/{,*/}*.js'
        ]
    },
    concat: {
        generated: {
          files: [
            {
              src: 'bower_components/jquery/dist/jquery.js',
              dest: '.tmp/concat/js/jquery.js',
            },
            {
              src: [
                'bower_components/bootstrap/dist/js/bootstrap.js',
                'bower_components/colorbox/jquery.colorbox.js',
              ],
              dest: '.tmp/concat/js/plugins.js'
            },
            {
              src: 'app/js/site/*.js',
              dest: 'dist/js/concat/site.js'
            }
          ]
        },
    },
    uglify: {
        generated: {
          files: [
            {
              src: '.tmp/concat/js/jquery.js',
              dest: 'dist/js/jquery.js',
            },
            {
              src: '.tmp/concat/js/plugins.js',
              dest: 'dist/js/plugins.js',
            },
            {
              src: 'dist/js/concat/site.js',
              dest: 'dist/js/site.js'
            }
          ]
        },
        // dist: {
        //     src: 'dist/js/concat/site.js',
        //     dest: 'dist/js/site.js'
        // }
    },

    imagemin: {
        options: {
            title: '빌드완료',  // optional
            message: '<%= pkg.name %> 구축을 성공적으로 완료.' //required
        },
        dist: {
            files: [{
                expand: true,
                cwd: '<%= config.app %>/images/',
                // src: '{,*/}*.{gif,jpeg,jpg,png}',
                src: ['**/*.{png,jpeg,jpg,gif}'],
                dest: '<%= config.dist %>/images/'
            }]
        }
    },
    watch: {
        options: { livereload: true },
        bower: {
            files: ['bower.json'],
            tasks: ['wiredep']
        },
        gruntfile: {
            files: ['Gruntfile.js'],
            tasks: ['newer:jshint']
        },
        js: {
            files: ['<%= config.app %>/js/**/*.js'],
            tasks: ['newer:jshint','useminPrepare','concat','uglify','usemin']
        },
        less: {
            files: ['<%= config.app %>/less/**/*.less'],
            tasks: ['useminPrepare','less','autoprefixer','concat','uglify','cssmin','usemin:css']
        },
        html: {
            files: ['<%= config.app %>/html/**/*.html'],
            tasks: ['useminPrepare','includereplace','usemin:html']
        },
        img: {
            files: ['<%= config.app %>/images/**/*.{gif,jpeg,jpg,png}'],
            tasks: ['newer:imagemin']
        }
    },

    connect: {
        server: {
            options: {
                port: 9000,
                hostname: 'localhost',
                livereload: 35729,
                // keepalive: true,
                base: '<%= config.dist %>',
                open: 'http://<%= connect.server.options.hostname %>:<%= connect.server.options.port %>/test-html/index.html'
            }
        }
    },
    copy: {
      dist: {
        files: [
        // // 나눔고딕 폰트 사용시 
        // {
        //     expand: true,
        //     dot: true,
        //     cwd: '<%= config.app %>/fonts/NanumGothic',
        //     src: '*.*',
        //     dest: '<%= config.dist %>/fonts/'
        // },
        // bootstrap fonts
        {
          expand: true,
          dot: true,
          cwd: 'bower_components/bootstrap/dist',
          src: 'fonts/*',
          dest: '<%= config.dist %>'
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= config.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },
    // 다중 태스크를 병렬로 실행하기
    concurrent: {
        server: [
          'copy:styles'
        ],
        dist: [
          // 'copy:styles', // css 복사, less 사용시 의미없음
          'imagemin'
        ]
    }
  });


  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
        return grunt.task.run(['connect', 'watch']);
    }

    grunt.task.run([
      'build',
      'connect',
      'watch'
    ]);

  });

  grunt.registerTask('html', [
    'clean:dist',
    'useminPrepare',
    'includereplace',
    'usemin:html',
    'prettify'
  ]);
  grunt.registerTask('style', [
    'clean:dist',
    'useminPrepare',
    'less',
    'csslint',
    'autoprefixer',
    'csscomb',
    'concat',
    'uglify',
    'cssmin:generated',
    'usemin:css'
  ]);
  grunt.registerTask('js', [
    'clean:dist',
    'useminPrepare',
    'newer:jshint',
    // 'concat:generated',
    'concat:generated',
    'uglify:generated'
    // 'usemin'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'includereplace',
    // 'usemin:html',
    'prettify',

    'less',
    'csslint',
    'autoprefixer',
    'csscomb',
    'concat',
    'uglify',
    'cssmin:generated',
    // 'usemin:css',

    'newer:jshint',
    'concat:generated',
    'uglify:generated',

    'usemin',

    'concurrent:dist',
    'copy:dist',
  ]);

  grunt.registerTask('default', [
    'build'
    // 'clean:dist',
    // 'useminPrepare',
    // 'includereplace',
    // 'less',
    // 'csslint',
    // 'autoprefixer',
    // 'csscomb',
    // 'cssmin',
    // 'newer:jshint',
    // 'concat',
    // 'uglify',
    // 'prettify',
    // 'concurrent:dist',
    // 'copy:dist',
    // 'usemin'
  ]);


};
