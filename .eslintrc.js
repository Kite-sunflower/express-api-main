module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-console': 'off',
    // 彻底关闭所有强制换行规则
    'object-curly-newline': 'off',
    'object-property-newline': 'off',
    'array-bracket-newline': 'off',
    'array-element-newline': 'off',
    'function-paren-newline': 'off',
    'implicit-arrow-linebreak': 'off',

    // Prettier 完全接管，强制一行
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'es5',
        printWidth: 400, // 拉到最大，绝对不换行
        tabWidth: 2,
        semi: true,
        endOfLine: 'auto',
        bracketSpacing: true,
      },
    ],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
  },
};
