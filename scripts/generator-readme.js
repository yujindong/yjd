/**
 * Since we moved our documentation to our website repo, we want to point to the
 * website from the docs in this repo
 *
 * This script write the link to the website in every READMEs.
 */

const { join } = require("path");
const { readdirSync, writeFileSync } = require("fs");

const cwd = process.cwd();

// 安装到DEV的模块，在这个数组中的模块，README.md中的安装提示为 npm i -D 或者 yarn --dev
const packagesInstalledToDep = [];


const packageDir = join(cwd, "packages");
const packages = readdirSync(packageDir);
// 文档地址
const getWebsiteLink = n => `https://www.yujindong.com/docs/zh-cn/${n}.html`;
// 读取pkg模块的package.json
const getPackageJson = pkg => require(join(packageDir, pkg, "package.json"));
// 根据模块生成issue地址
const getIssueLabelLink = p =>
  `https://github.com/yujindong/yjd/issues?utf8=%E2%9C%93&q=is%3Aissue+label%3A%22${encodeURIComponent(
    p
  )}%22+is%3Aopen`;
// npm安装脚本
const getNpmInstall = name =>
  `npm i ${
  packagesInstalledToDep.includes(name) ? "-D" : "-S"
  } ${name}`;
// yarn安装脚本
const getYarnAdd = name =>
  `yarn add ${name} ${packagesInstalledToDep.includes(name) ? "--dev" : ""}`;

const getNpmCdn = name =>
  `<script src="https://cdn.jsdelivr.net/npm/@yjd/${name}@${getPackageJson(name).version}/dist/${name}.umd.min.js"></script>`


// 生成README.md文件
const generateReadme = ({ id, websiteLink, issuesLink, name, description }) =>
  `# ${name}
> ${description}
See our website [${name}](${websiteLink}) for more information${
  issuesLink
    ? ` or the [issues](${issuesLink}) associated with this package`
    : ""
  }.
## Install
Using npm:
\`\`\`sh
${getNpmInstall(name)}
\`\`\`
or using yarn:
\`\`\`sh
${getYarnAdd(name)}
\`\`\`
or using script in browser:
\`\`\`html
${getNpmCdn(id)};
\`\`\`
`;

packages
  .filter(x => x !== "README.md") // 忽略根路径的README.md
  .forEach(id => {
    const { name, description } = getPackageJson(id);
    const readmePath = join(packageDir, id, "README.md");

    // generate
    const websiteLink = getWebsiteLink(id);
    const issuesLink = getIssueLabelLink(`pkg: ${id}`);

    const readme = generateReadme({
      id,
      websiteLink,
      issuesLink,
      name,
      description,
    });

    // write
    writeFileSync(readmePath, readme);

    console.log(id, "模块生成README.md文件");
  });