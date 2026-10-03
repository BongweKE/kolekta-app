import studio from '@sanity/eslint-config-studio'

export default [
  ...studio,
  {
    files: ['scripts/**/*.cjs'],
    languageOptions: {
      globals: {
        console: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        require: 'readonly',
        module: 'readonly',
        setTimeout: 'readonly',
      },
    },
  },
]
