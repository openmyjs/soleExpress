// .eslintrc.js
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['plugin:@typescript-eslint/recommended'],
  rules: {
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: '*' }
      // { blankLine: 'always', prev: 'import', next: '*' },
      // { blankLine: 'always', prev: 'const', next: '*' },
      // { blankLine: 'always', prev: 'function', next: '*' },
      // { blankLine: 'always', prev: 'switch', next: '*' },
      // { blankLine: 'always', prev: 'let', next: '*' },
      // { blankLine: 'always', prev: 'var', next: '*' },
      // { blankLine: 'always', prev: 'if', next: '*' },
      // { blankLine: 'always', prev: '*', next: 'return' },
      // { blankLine: 'always', prev: '*', next: 'case' },
      // { blankLine: 'always', prev: 'block-like', next: 'block-like' },
      // { blankLine: 'always', prev: 'block-like', next: '*' },
      // { blankLine: 'always', prev: '*', next: 'block-like' }
    ],
    'no-console': 'warn', // 或 'error' /warn
    '@typescript-eslint/no-explicit-any': 'off', // 允许 any 类型
    '@typescript-eslint/explicit-module-boundary-types': 'off', // 不强制导出类型
    '@typescript-eslint/no-non-null-assertion': 'off', // 允许非空断言
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'all', // 修改这里为 "all" 来严格检查所有未使用的参数
        ignoreRestSiblings: true,
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_'
      }
    ]
  }
}
