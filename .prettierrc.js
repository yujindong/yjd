module.exports = {
  "arrowParens": "avoid", // 箭头函数无参数时，是否要求有括号 avoid: 无括号 always: 永远保证有括号
  "trailingComma": "none",
  "useTabs": false,
  "semi": true,
  "singleQuote": false,
  quoteProps: "as-needed",
  "bracketSpacing": true,
  "jsxBracketSameLine": true,
  "tabWidth": 2,
  "printWidth": 80,
  htmlWhitespaceSensitivity: "ignore",
  "overrides": [{
    "files": [
      "**/packages/*/src/**/*.ts",
      "**/packages/*/test/**/*.ts"
    ]
    // "options": {
    //   "parser": "babel",
    //   "trailingComma": "none"
    // }
  }]
}

