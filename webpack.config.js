const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, 'src/app'),
      '@models': path.resolve(__dirname, 'src/app/models'),
      '@services': path.resolve(__dirname, 'src/app/services'),
      '@components': path.resolve(__dirname, 'src/app/components'),
      '@environments': path.resolve(__dirname, 'src/environments')
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10
        },
        firebase: {
          test: /[\\/]node_modules[\\/](@angular\/fire|firebase)[\\/]/,
          name: 'firebase',
          chunks: 'all',
          priority: 20
        },
        angular: {
          test: /[\\/]node_modules[\\/]@angular[\\/]/,
          name: 'angular',
          chunks: 'all',
          priority: 15
        }
      }
    }
  }
};
