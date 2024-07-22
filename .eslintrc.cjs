/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
    'plugin:prettier/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', '*.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.app.json'
  },
  plugins: ['react-refresh', 'react'],
  rules: {
    complexity: ['warn', 15],
    eqeqeq: ['warn', 'smart'],
    'no-useless-concat': 'error',
    'prefer-template': 'warn',
    'prettier/prettier': 'warn',
    quotes: ['warn', 'single', { allowTemplateLiterals: true, avoidEscape: true }],
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      rules: {
        '@typescript-eslint/array-type': ['warn', { default: 'array-simple' }],
        '@typescript-eslint/await-thenable': 'off',
        '@typescript-eslint/ban-types': ['error', { extendDefaults: true, types: { '{}': false } }],
        '@typescript-eslint/consistent-type-exports': 'error',
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
        '@typescript-eslint/no-unnecessary-condition': 'warn',
        '@typescript-eslint/no-unnecessary-type-constraint': 'error',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          { args: 'after-used', argsIgnorePattern: '^_', ignoreRestSiblings: true, varsIgnorePattern: '^_' }
        ],
        '@typescript-eslint/prefer-nullish-coalescing': 'error',
        '@typescript-eslint/prefer-optional-chain': 'error',
        '@typescript-eslint/restrict-template-expressions': ['error', { allowAny: true, allowBoolean: true }],
        '@typescript-eslint/sort-type-constituents': 'warn',
        'react/jsx-sort-props': ['warn', { shorthandFirst: true, ignoreCase: true, callbacksLast: true }]
      }
    },
    {
      files: ['**/*.d.ts'],
      rules: {
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-unused-vars': 'off'
      }
    }
  ]
};
