'use strict';

/**
 * @typedef {function(
 *  params?: GulpTypescript.Params,
 *  filters?: GulpTypescript.FilterSettings,
 *  reporter?: GulpTypescript.Reporter
 * ):GulpTypescript.CompilationStream} GulpTypescriptFunction
 */

const $ = require('gulp-load-plugins')();

/** @type {Gulp} gulp */
const gulp = require('gulp');

const del = require('del');

const SRC_DIR = './src';
const BUILD_DIR = './build';

gulp.task('clean', () => del([BUILD_DIR]));

gulp.task('ts', () => {
	const tsProject = $.typescript.createProject('tsconfig.json');
	const tsResult = tsProject.src().pipe($.typescript());
	
	return tsResult.js
		.pipe(gulp.dest(BUILD_DIR));
});


gulp.task('build', gulp.parallel(
	'ts'
));

gulp.task('watch', () => {
	gulp.watch([`${SRC_DIR}/**/*.ts`], gulp.series('build'));
});

gulp.task('default', gulp.series(
	'clean',
	'build',
	'watch'
));