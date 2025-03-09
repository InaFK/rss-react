module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier'
  ],
  plugins: ['react', '@typescript-eslint', 'react-compiler', 'prettier'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    'prettier/prettier': 'error',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-compiler/react-compiler': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
