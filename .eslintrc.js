module.exports = {
  env: {
    node: true,
  },

  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    '@typescript-eslint/no-non-null-assertion': 0,
  },

  extends: ['eslint:recommended', 'plugin:prettier/recommended'],

  overrides: [
    {
      files: ['**/*.vue'],
      extends: ['plugin:vue/essential'],
    },
    {
      files: ['**/*.ts?(x)'],
      parser: '@typescript-eslint/parser',
      extends: ['plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
    {
      files: ['**/*.spec.{j,t}s'],
      env: {
        jest: true,
      },
    },
  ],
};
