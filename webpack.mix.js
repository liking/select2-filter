let mix = require('laravel-mix')

mix.setPublicPath('dist')
    .js('resources/js/select2-filter.js', 'js')
    .sass('resources/sass/select2-filter.scss', 'css')
