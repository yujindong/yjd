const { join } = require("path");
const { readdirSync } = require("fs");
// packages 目录
const packageDir = join(__dirname, "../", "packages");
// 子项目目录列表
const packages = readdirSync(packageDir);
module.exports = {
  packageDir,
  packages
}