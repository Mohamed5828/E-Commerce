const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const purgecss = require("gulp-purgecss");

function buildStyles() {
  return src("sass/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("css"));
}

function purgeUnusedCSS() {
  return src("css/*.css")
    .pipe(purgecss({ content: ["**/*.html"] }))
    .pipe(dest("css"));
}

function watchTask() {
  watch(["sass/**/*.scss"], series(buildStyles, purgeUnusedCSS));
}

exports.default = series(buildStyles, purgeUnusedCSS, watchTask);
