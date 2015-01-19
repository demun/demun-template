module.exports = function (grunt) {
// npm install --save-dev grunt grunt-contrib-csslint grunt-usemin grunt-filerev grunt-contrib-concat grunt-contrib-uglify grunt-contrib-cssmin time-grunt load-grunt-tasks grunt-contrib-clean grunt-contrib-copy grunt-includes grunt-contrib-less jshint-stylish grunt-concurrent grunt-contrib-watch grunt-newer grunt-notify grunt-csscomb grunt-contrib-jshint grunt-contrib-connect grunt-contrib-livereload grunt-wiredep grunt-autoprefixer grunt-contrib-imagemin grunt-filerev

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
      gruntfile: 'grunt'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    banner: '/*\n' +
        ' ======================================================================== \n' +
        ' * Project   : <%= pkg.name %>(<%= pkg.description %>) v<%= pkg.version %>\n' +
        ' * Producer  : <%= pkg.make.company %>, <%= pkg.make.homepage %>\n' +
        ' * Publisher : <%= pkg.make.publisher %>, <%= pkg.make.blog %>, <%= pkg.make.email %>\n' +
        ' * Update    : <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * License   : <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
        ' ======================================================================== \n' +
        ' */\n',

    // Project settings
    config: appConfig,

    clean: {
      dist: {
        files: [{
          dot: true,
          nonull: true,
          src: [
            '.tmp/*',
            '<%= less.docs.dest %>',
            '<%= config.dist %>/*'
          ]
        }]
      },
      server: '.tmp'
    },

    jshint: {
        options: {
            jshintrc: '<%= config.gruntfile %>/.jshintrc',
            reporter: require('jshint-stylish')
        },
        all: [
            'Gruntfile.js',
            '<%= config.app %>/scripts/{,*/}*.js',
            '!<%= config.app %>/scripts/vendor/*'
        ]
    },

    less: {
        docs: {
            options: {
                banner: '<%= banner %>'
            },
            src: '<%= config.app %>/less/style.less',
            dest: '.tmp/styles/main.css'
        },
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
        docs: {
            src: '<%= less.docs.dest %>'
        }
    },
    csscomb: {
        options: {
            config: '<%= config.gruntfile %>/.csscomb.json'
        },

        dist: {
            expand: true,
            cwd: '.tmp/styles/',
            src: ['*.css', '!*.min.css'],
            dest: '.tmp/styles/'
        }
    },
    includes: {
        build: {
            cwd: '<%= config.app %>/html/docs/',
            src: ['**/*.html'],
            dest: '<%= config.dist %>/',
            options: {
                flatten: true,
                includePath: '<%= config.app %>/html/include/'
            }
        }
    },
    useminPrepare: {
      options: {
        dest: '<%= config.dist %>'
      },
      html: ['<%= config.app %>/index.html']
    },

    usemin: {
      options: {
        assetsDirs: [
          '<%= config.dist %>'
        ]
      },
      html: ['<%= config.dist %>/{,*/}*.html'],
      css: ['<%= config.dist %>/styles/{,*/}*.css']
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
        bower: {
            files: ['bower.json'],
            tasks: ['newer:jshint']
        },
        gruntfile: {
            files: ['Gruntfile.js'],
            tasks: ['newer:jshint'],
            options: {
                livereload: true
            }
        },
        js: {
            files: [
                '<%= config.app %>/scripts/**/*.js'
            ],
            tasks: ['newer:jshint','useminPrepare','concat','uglify','usemin'],
            options: {
                livereload: true
            }
        },
        less: {
            files: ['<%= config.app %>/less/**/*.less'],
            tasks: ['useminPrepare','less','autoprefixer','csscomb','concat','uglify','cssmin','usemin:css']
        },
        html: {
            files: ['<%= config.app %>/html/**/*.html'],
            tasks: ['useminPrepare','includes','usemin:html'],
            options: {
                livereload: true,
            }
        },
        img: {
            files: ['<%= config.app %>/images/**/*.{gif,jpeg,jpg,png}'],
            tasks: ['newer:imagemin'],
            options: {
                livereload: true,
            }
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
        // 나눔고딕 폰트 사용시 
        {
            expand: true,
            dot: true,
            cwd: '<%= config.app %>/fonts/',
            src: '**',
            dest: '<%= config.dist %>/fonts/'
        },
        // bxslider 사용시
        {
            expand: true,
            dot: true,
            cwd: 'bower_components/massmans-bxslider/images',
            dest: '<%= config.dist %>/images',
            src: [
                '*.{ico,png,gif}'
            ]
        },
        // jquery ui 사용시
        {
            expand: true,
            dot: true,
            cwd: 'bower_components/jquery-ui/themes/smoothness/',
            dest: '<%= config.dist %>/styles',
            src: 'images/*'
        },
        // colorbox 사용시
        // 1.여기서 example 번호 변경
        // 2.html 에서 example 번호로 css 경로 변경
        {
            expand: true,
            dot: true,
            cwd: 'bower_components/jquery-colorbox/example5/',
            dest: '<%= config.dist %>/styles',
            src: 'images/*'
        },
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



  grunt.registerTask('server', function (target) {
    grunt.log.warn('`server` 는 사용되지 않습니다. 다음부터는 `grunt serve` 를 사용하세요');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
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

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'includes',
    'less',
    'autoprefixer',
    'csscomb',
    'concurrent:dist',
    'concat',
    'cssmin',
    'uglify',
    'copy:dist',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'build'
  ]);


};
