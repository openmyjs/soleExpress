// .prettierrc.js
module.exports = {
  $schema: 'https://json.schemastore.org/prettierrc',
  singleQuote: true,
  semi: false,
  tabWidth: 2,
  printWidth: 120,
  trailingComma: 'none',
  bracketSpacing: true,
  overrides: [
    {
      files: '*.md',
      options: {
        // 可选：覆盖全局配置（此处示例为保留原有换行）
        // "proseWrap": "preserve"
      }
    }
  ]
}
