const { join } = require("path");
const { readdirSync, writeFileSync } = require("fs");
const cwd = process.cwd();
const packageDir = join(cwd, "packages");
const packages = readdirSync(packageDir);