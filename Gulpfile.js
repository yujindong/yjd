const { join } = require("path");

const gulp = require("gulp");
const config = require("./config/config");

console.log(a);
// 构建模块
function buildRollup(packages) {
  const buildConfig = packages.map((name) => {
    return {
      [name]: {
        src: join(__dirname, "packages", name, "src", `index.ts`)
      }
    }
  })
  return buildConfig
}
console.log(buildRollup(config.packages))
gulp.task("build-cjs", (cb) => {
  cb();
});
gulp.task("build-ems", (cb) => {
  cb()
});
gulp.task("build-commonjs", (cb) => {
  cb()
});




gulp.task("build", gulp.parallel("build-cjs", "build-ems", "build-commonjs"));
gulp.task("default", gulp.series("build"));
