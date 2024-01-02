module.exports = {
  root: true,
  plugins: ['simple-import-sort'],
  extends: ['universe/native', 'universe', 'plugin:react-hooks/recommended'],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/order': 'off',
  },
};
