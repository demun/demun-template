module.exports = function(grunt) {
    'use strict';

    // 작업시간 표시
    require('time-grunt')(grunt);

    // 자동으로 grunt 태스크를 로드합니다. grunt.loadNpmTasks 를 생략한다.
    require('load-grunt-tasks')(grunt);


    // Configurable paths
    var appConfig = {
        app: 'SourceCode',
        dist: 'FinishCode',
        devcode: 'DevCode',
        bower: 'bower_components',
        gruntfile: 'SourceCode/grunt'
    };

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
                        '<%= config.app %>/css',
                        '<%= config.devcode %>/**/*.*',
                        '<%= config.dist %>/**/*.*',
                        '!<%= config.dist %>/images/**/*.*',
                        '!<%= config.dist %>/fonts/**/*.*'
                    ]
                }]
            },
        },

        less: {
            docs: {
                options: {
                    banner: '<%= banner %>',
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: 'style.css.map',
                    sourceMapFilename: '<%= config.dist %>/css/style.css.map'
                },
                src: '<%= config.app %>/less/style.less',
                dest: '<%= config.app %>/css/style.css'
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
                options: {
                    map: true
                },
                // src: '<%= config.app %>/css/style.css'
                src: '<%= less.docs.dest %>'
            }
        },

        // app -> dest 이동
        csscomb: {
            options: {
                config: '<%= config.gruntfile %>/.csscomb.json'
            },
            dist: {
                expand: true,
                cwd: '<%= config.app %>/css/',
                src: ['*.css', '!*.min.css'],
                dest: '<%= config.dist %>/css/'
            }
        },

        csslint: {
            docs: {
                options: {
                    csslintrc: '<%= config.gruntfile %>/.csslintrc'
                },
                src: '<%= config.dist %>/css/style.css'
            }
        },

        cssmin: {
            options: {
                compatibility: 'ie8',
                keepSpecialComments: '*',
                noAdvanced: true,
                banner: ' <%= banner %> '
            },

            docs: {
                src: '<%= config.dist %>/css/style.css',
                dest: '<%= config.dist %>/css/style.min.css'
            }
        },

        jshint: {
            options: {
                jshintrc: '<%= config.gruntfile %>/.jshintrc'
            },
            grunt: {
                src: ['Gruntfile.js']
            },
            docs: {
                src: '<%= config.app %>/js/common.js'
            }
        },


        concat: {
            docs: {
                options: {
                    separator: ';',
                    // stripBanners: true,
                    // sourceMap: true,
                    // sourceMapName: '<%= config.app %>/js/plugins.js.map',
                    // banner: '<%= banner %>'
                },
                src: [
                    '<%= config.app %>/js/common.js'
                ],
                dest: '<%= config.dist %>/js/common.js'
            }
        },

        uglify: {
            options: {
                preserveComments: 'some', // 코멘트 없음
                sourceMap: true,
                // sourceMapIncludeSources: true
                banner: '<%= banner %>'
            },

            docs: {
                src: '<%= concat.docs.dest %>',
                dest: '<%= config.dist %>/js/common.min.js'
            },
        },

        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['newer:jshint:grunt']
            },
            gruntfile: {
                files: ['Gruntfile.js'],
                tasks: ['newer:jshint:grunt'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: [
                    '<%= config.app %>/js/**/*.js'
                    // '<%= config.app %>/js/common.js'
                ],
                tasks: ['newer:jshint:docs', 'concat:docs', 'uglify:docs'],
                options: {
                    livereload: true
                }
            },
            less: {
                files: ['<%= config.app %>/less/**/*.less'],
                tasks: ['less', 'autoprefixer', 'csscomb', 'csslint', 'cssmin']
            },

            html: {
                files: ['<%= config.app %>/html/**/*.html'],
                tasks: ['includes'],
                options: {
                    livereload: true,
                }
            },
            jade: {
                files: ['<%= config.app %>/jade/**/*.jade'],
                tasks: ['jade'],
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

        jade: {
            dynamic_mappings: {
                options: {
                    client: false,
                    pretty: true
                },
                files: [
                    {
                        expand: true,                            // 동적 기술법을 활성화.
                        cwd   : '<%= config.app %>/jade/docs/',  // Src 패턴의 기준 폴더.
                        src   : ['**/*.jade'],                   // 비교에 사용할 패턴 목록.
                        dest  : '<%= config.dist %>',            // 목적 경로의 접두사(사실상 폴더명)
                        ext   : '.html',                         // dest의 파일들의 확장자.
                    },
                ],
            },
        },


        includes: {
            build: {
                cwd: '<%= config.app %>/html/docs/',
                src: ['**/*.html'],
                dest: '<%= config.dist %>',
                options: {
                    flatten: true,
                    includePath: '<%= config.app %>/html/include/'
                }
            }
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

        copy: {
            build: {
                files: [
                    {
                        expand: true,
                        // flatten: true,
                        // filter: 'isFile',
                        cwd: '<%= config.app %>',
                        src: ['**','!grunt/**','!less/**'],
                        dest: '<%= config.devcode %>'
                    }
                ]
            },
            dev: {
                files: [
                    // // fonts
                    // {
                    //     expand: true,
                    //     cwd: '<%= config.bsless %>/fonts/',
                    //     src: '**',
                    //     dest: '<%= config.dist %>/fonts/'
                    // },
                    // jquery
                    {
                        nonull: true,
                        src: '<%= config.bower %>/jquery/jquery.min.js',
                        dest: '<%= config.dist %>/js/lib/jquery.min.js'
                    },
                    // // jquery ui
                    // {
                    //     nonull: true,
                    //     src: '<%= config.bower %>/jquery-ui/jquery-ui.min.js',
                    //     dest: '<%= config.dist %>/plugins/jquery-ui/jquery-ui.min.js'
                    // },
                    // // bxSlider
                    // {
                    //     expand: true,
                    //     dot: true,
                    //     cwd: '<%= config.bower %>/bxSlider/',
                    //     src: ['**','!*.json'],
                    //     dest: '<%= config.dist %>/plugins/bxSlider/'
                    // },
                    // // magnific-popup
                    // {
                    //     expand: true,
                    //     dot: true,
                    //     cwd: '<%= config.bower %>/magnific-popup/dist/',
                    //     src: ['**'],
                    //     dest: '<%= config.dist %>/plugins/magnific-popup/'

                    // },
                    // // angular
                    // {
                    //     nonull: true,
                    //     src: '<%= config.bower %>/angular/angular.min.js',
                    //     dest: '<%= config.dist %>/plugins/angular/angular.min.js'
                    // },
                    // // modernizr
                    // {
                    //     nonull: true,
                    //     src: '<%= config.bower %>/modernizr/modernizr.js',
                    //     dest: '<%= config.dist %>/plugins/modernizr/modernizr.js'
                    // },
                    // // masonry
                    // {
                    //     nonull: true,
                    //     src: '<%= config.bower %>/masonry/dist/masonry.pkgd.min.js',
                    //     dest: '<%= config.dist %>/plugins/masonry/masonry.pkgd.min.js'
                    // },
                    // // FlexSlider
                    // {
                    //     expand: true,
                    //     dot: true,
                    //     cwd: '<%= config.bower %>/FlexSlider/',
                    //     src: ['**','!*.json','!*.txt','!*.md','!*.mdown'],
                    //     dest: '<%= config.dist %>/plugins/FlexSlider/'
                    // },
                    // bootstrap
                    {
                        expand: true,
                        cwd: '<%= config.bower %>/bootstrap/dist/',
                        src: ['**','!npm.js'],
                        dest: '<%= config.dist %>/plugins/bootstrap/'

                    }
                ]
            },
        },

        // 다중 태스크를 병렬로 실행하기
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            dev: [
                'includes',
                'jade',
                'newer:imagemin',
                'copy:dev'
            ],
            build: [
                'includes',
                'jade',
                'newer:imagemin',
                'copy'
            ]
        }

    });

    // 작업시
    grunt.registerTask('server', function (target) {
        grunt.log.warn('`server` 는 사용되지 않습니다. 다음부터는 `grunt serve` 를 사용하세요');
        grunt.task.run(['serve:' + target]);
    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['connect', 'watch']);
        }

        grunt.task.run([
            'default',
            'connect',
            'watch'
        ]);
    });

    // less
    grunt.registerTask('less-docs', [
            'less:docs',
            'autoprefixer:docs',
            'csscomb',
            'csslint:docs',
            'cssmin:docs'
        ]
    );

    // javascript 
    grunt.registerTask('js-dev', [
            'newer:jshint',
            'concat',
            'uglify'
        ]
    );

    // build
    grunt.registerTask('build', [
            'clean',
            'less-docs',
            'js-dev',
            'concurrent:build'
        ]
    );

    // default
    grunt.registerTask('default', [
            'clean',
            'less-docs',
            'js-dev',
            'concurrent:dev'
        ]
    );

};
