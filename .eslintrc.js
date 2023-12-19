module.exports = {
  parser: "@babel/eslint-parser",
  plugins: ['react', 'react-native'],
  env: {
      'react-native/react-native': true,
  },
  parserOptions: {
    "sourceType": "module",
    ecmaFeatures: {
      jsx: true
    },
    "requireConfigFile": false,
  },
  extends: [
    'eslint:recommended', 
    'plugin:react/recommended', 
    'plugin:react-native/all',
    "prettier",
    "prettier/react"
  ],
  rules: {
    "react-native/no-unused-styles": 2,
    "react-native/split-platform-components": 2,
    "react-native/no-inline-styles": 2,
    "react-native/no-color-literals": 0,
    "react-native/no-raw-text": 2,
    "react-native/no-single-element-style-arrays": 2,
    'react/prop-types': 0,
  }
};