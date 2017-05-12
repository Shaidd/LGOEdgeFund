'use strict';
const build = require('./highcharts/assembler/build.js').build;
build({
    base: './highcharts/js/masters/',
    files: ['custom.src.js'],
    output: './dist/'
})