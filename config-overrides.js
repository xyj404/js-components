const {
    override,
    fixBabelImports,
    addLessLoader,
    addWebpackAlias
} = require('customize-cra');
// const rewireStyledComponents = require('react-app-rewire-styled-components');
const path = require('path');
const rewireReactHotLoader = require('react-app-rewire-hot-loader');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
    }),
    addLessLoader({
        javascriptEnabled: true
        // modifyVars: { '@primary-color': '#ff9c32' }
    }),
    addWebpackAlias({
        '@src': path.resolve(__dirname, 'src'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@configs': path.resolve(__dirname, 'src/configs'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@pages': path.resolve(__dirname, 'src/pages')
    }),
    config => rewireReactHotLoader(config, process.env.NODE_ENV)
);
