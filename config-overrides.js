const { override, overrideDevServer, addWebpackAlias } = require("customize-cra");
const paths = require('react-scripts/config/paths');
const path = require("path")

const addDevServer = () => config => {
    return {
        ...config,
        proxy: {
            // Proxy forwarding rules
            // hosts: {
            //     // Proxy online address to local server address
            //     'http://dev.eden.com/': {
            //         protocol: 'http',
            //         hostname: '127.0.0.1',
            //         port: '3000',
            //         path: '/',
            //     }
            // },
        },
    }
}

module.exports = {
    webpack: override(
        addWebpackAlias({
            ["~static"]: path.resolve(__dirname, './src/static'),
            ["~components"]: path.resolve(__dirname, './src/components'),
            ["~pages"]: path.resolve(__dirname, './src/pages'),
            ["~request"]: path.resolve(__dirname, './src/request'),
            ["~route"]: path.resolve(__dirname, './src/route'),
            ["~utils"]: path.resolve(__dirname, './src/utils')
        }),
        (config, env) => {
            config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false;
            paths.appBuild = path.join(path.dirname(paths.appBuild), 'dist');
            config.output.path = path.join(path.dirname(config.output.path || '/'), 'dist');
            return config
        }
    ),
    devServer: overrideDevServer(addDevServer())
}