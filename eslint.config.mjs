import js from '@eslint/js'

const eslintConfig = [
  js.configs.recommended,
  {
    plugins: {
      'import-helpers': (await import('eslint-plugin-import-helpers')).default,
    },
    rules: {
      'import-helpers/order-imports': [
        'warn',
        {
          newlinesBetween: 'always',
          groups: ['module', '/^@\\//', ['parent', 'sibling', 'index']],
          alphabetize: { order: 'asc', ignoreCase: true },
        },
      ],
      'no-console': ['warn', { allow: ['warn', 'error', 'info', 'debug'] }],
      camelcase: 'off',
    },
  },
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'build/**',
      'out/**',
      'next-env.d.ts',
      'commitlint.config.js',
    ],
  },
]

export default eslintConfig
