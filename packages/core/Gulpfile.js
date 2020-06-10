const gulp = require('gulp');
const { join } = require("path");
const { rollup } = require('rollup');
const camelcase = require("camelcase");
const nodeResolve = require('@rollup/plugin-node-resolve').default;
const { babel } = require('@rollup/plugin-babel');
const { uglify } = require("rollup-plugin-uglify");
const pkg = require("./package.json");

// 输出文件注释头信息
const bannerOptions = {
  banner: `/*!
 * 
 *         ${pkg.name}
 *         version: ${pkg.version}
 *         license: ${pkg.license}
 *         author: ${pkg.author}
 *         home: http://www.yujindong.com/docs
 *       
 */`
}

// 当前项目绝对路径
const currentPath = join(__dirname, "");
// 当前项目的目录名
const name = currentPath.slice(currentPath.lastIndexOf('/') + 1).trim();
const extensions = ['.js', '.jsx', '.ts', '.tsx', '.es6', '.es', '.mjs'];

// 不是以 . 或 / 开头的模块，认定为外部模块
function isBareModuleId(id) {
  return !id.startsWith(".") && !id.startsWith("/");
}
/**
 * output配置
 * @param module one of [umd, cjs, esm]
 */
function getOutputOptions(options) {



  const fileNameMap = {
    "cjs": name,
    "esm": `${name}.module`,
    "umd": `${name}.umd`
  }

  const config = {
    file: `./dist/${fileNameMap[options.format]}${options.min ? '.min.js' : '.js'}`,
    format: options.format,
    sourcemap: true,
    ...bannerOptions
  }
  if (options.format === "umd") {
    config.name = camelcase(name, { pascalCase: true })
  }
  return config;

}

function getPlugins(options) {
  let babelOptions = {
    rootMode: "upward",
    exclude: '/node_modules/',
    extensions,
    sourceMaps: true
  }
  if (options.format !== "cjs") {
    babelOptions.babelHelpers = "runtime";
    babelOptions.plugins = [["@babel/transform-runtime", { useESModules: true }]]
  }
  const plugins = [
    nodeResolve({ extensions }),
    babel(babelOptions)
  ]
  if (options.min && options.format !== "esm") {
    plugins.push(uglify());
  }
  return plugins;
}
/**
 * @param options
 * options.format  支持 cjs, es, umd  不支持system amd, iife,
 * options.min 是否压缩
 */
function getConfig(options) {
  const plugins = getPlugins(options);
  const input = "./src/index.ts";
  const config = {
    input,
    external: isBareModuleId,
    plugins
  }
  const output = getOutputOptions(options)
  return {
    config,
    output,
  }
}

gulp.task("build-cjs", async () => {
  const { config: c1, output: o1 } = getConfig({ format: "cjs", min: false });
  const { config: c2, output: o2 } = getConfig({ format: "cjs", min: true });
  const [cjsBundle, cjsMinBundle] = await Promise.all([rollup(c1), rollup(c2)])
  cjsBundle.write(o1);
  cjsMinBundle.write(o2);
  // return;
})
gulp.task('build-ems', () => {
  const { config, output } = getConfig({ format: "esm", min: true });
  return rollup(config).then(bundle => {
    return bundle.write(output);
  })
});

gulp.task("build-umd", async () => {
  const { config: c1, output: o1 } = getConfig({ format: "umd", min: false });
  const { config: c2, output: o2 } = getConfig({ format: "umd", min: true });
  const [umdBundle, umdMinBundle] = await Promise.all([rollup(c1), rollup(c2)])
  umdBundle.write(o1);
  umdMinBundle.write(o2);
  // return;
})
gulp.task("build", gulp.parallel("build-cjs", "build-ems", "build-umd"));