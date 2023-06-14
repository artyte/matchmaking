module.exports = {
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    indent: ['error', 2],
    'no-console': ['warn'],
    'no-unused-vars': ['error'],
  },
  env: {
    jest: true,
  },
};

// const extends = ['eslint:recommended'];
// const parserOptions = {
//     'ecmaVersion': 2020,
//     'sourceType': 'module',
//   };
// const rules = {
//     'semi': ['error', 'always'],
//     'quotes': ['error', 'single'],
//     'indent': ['error', 2],
//     'no-console': ['warn'],
//     'no-unused-vars': ['error'],
//   };

// export {
//   extends,
//   parserOptions,
//   rules
// };