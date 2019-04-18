const path = require('path')
const nodeSass = require('node-sass')

module.exports = function (grunt) {
  const sass = {
    dev: {
      options: {
        implementation: nodeSass,
        style: 'expanded',
        sourcemap: true,
        includePaths: [
          'node_modules'
        ],
        outputStyle: 'compressed'
      },
      files: [{
        expand: true,
        cwd: 'common/assets/sass',
        src: ['*.scss', 'custom/*.scss'],
        dest: 'public/stylesheets/',
        ext: '.min.css'
      }]
    }
  }

  const watch = {
    css: {
      files: ['common/assets/sass/**/*.scss'],
      tasks: ['sass'],
      options: {
        spawn: false,
        livereload: true
      }
    },
    assets: {
      files: ['common/assets/**/*', '!common/assets/sass/**'],
      tasks: ['copy:assets'],
      options: {
        spawn: false
      }
    }
  }

  const rewrite = {
    'application.min.css': {
      src: 'public/stylesheets/application.min.css',
      editor (contents) {
        const staticify = require('staticify')(path.join(__dirname, 'public'))
        return staticify.replacePaths(contents)
      }
    }
  }

  const compress = {
    main: {
      options: {
        mode: 'gzip'
      },
      files: [
        { expand: true, src: ['public/images/*.jpg'], ext: '.jpg.gz' },
        { expand: true, src: ['public/images/*.gif'], ext: '.gif.gz' },
        { expand: true, src: ['public/images/*.png'], ext: '.png.gz' },
        { expand: true, src: ['public/javascripts/*.js'], ext: '.js.gz' },
        { expand: true, src: ['public/stylesheets/*.css'], ext: '.css.gz' }
      ]
    }
  }

  grunt.initConfig({
    clean: ['public', 'govuk_modules'],
    sass,
    watch,
    rewrite,
    compress
  });

  [
    'grunt-contrib-cssmin',
    'grunt-contrib-compress',
    'grunt-contrib-watch',
    'grunt-contrib-clean',
    'grunt-sass',
    'grunt-rewrite'
  ].forEach(task => {
    grunt.loadNpmTasks(task)
  })

  grunt.registerTask('generate-assets', [
    'clean',
    'sass',
    'rewrite',
    'compress'
  ])

  grunt.registerTask('default', ['generate-assets', 'concurrent:target'])
}
