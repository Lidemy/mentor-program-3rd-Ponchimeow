const path = require('path');

module.exports = {
  mode: 'development',
  entry: './hw2/src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './hw2/dist'),
  },
};
