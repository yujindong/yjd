const camelCase = require("camelcase");
// const outpubOptions = {
//   banner: `/*!
//  * 
//  *         ${pkg.name}
//  *         version: ${pkg.version}
//  *         license: ${pkg.license}
//  *         author: ${pkg.author}
//  *         home: http://www.yujindong.com/hbgj
//  *       
//  */`
// }

/* 
output: {
      file: `dist/umd/${moduleFileName}.js`,
      format: "umd",
      name: ModuleName,
      globals,
      ...outpubOptions,
    },
 */
/**
 * @param {*} config 
 * config.name 子项目文件夹名
 */
function output(config) {
  config.name = "core";
  const name = camelCase(config.name, { pascalCase: true });
  return {
    file: "dist/umd/name.js",
    format: "umd",
    name
  };
}
output({})
module.exports = {
  output
}