const path = require('path');
//  引入fs文件系统模板
const fs = require('fs');
const resolve = dir => {
    return path.join(__dirname, dir);
};
const BASE_URL = process.env.NODE_ENV === 'production' ? '/' : '/';
module.exports = {
    publicPath: BASE_URL, // vue-cli3.2.2版本后改为publicPath。部署应用程序的基本URL。相当与webpack(output.publicPath)
    assetsDir: './', // 打包后放置生成的静态资源 (js、css、img、fonts) 的目录。 相当于webpack(outputDir)
    lintOnSave: true,
    productionSourceMap: false,
    chainWebpack: config => {
        // 已有的loader规则请看：https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli-service/lib/config/base.js
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@cmpt', resolve('src/components'))
            .set('@style', resolve('src/assets/styles'))
            .set('@image', resolve('src/assets/images'));
    },
    devServer: {
        host: 'localhost',
        port: 8080,
        open: false,
        hot: true,
        proxy: {
            '^/api': {
                target: 'http://localhost:8080',
                // target: 'oauth2resource.test',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api'
                }
            }
        }
    },
    // css相关配置
    css: {
        extract: process.env.NODE_ENV === 'production', // 是否使用css分离插件 ExtractTextPlugin：生产环境true，开发环境false。（css提取成单独style文件，会导致css热加载失败）
        sourceMap: false, // 开启 CSS source maps?
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-pxtorem')({
                        rootValue: 50,
                        propList: ['*'],
                        unitPrecision: 5,
                        replace: true,
                        mediaQuery: false,
                        minPixelValue: 1
                    }), // 换算的基数
                    require('autoprefixer')({
                        browsers: ['Android >= 4.0', 'iOS >= 7']
                    })
                ]
            },
            less: {
                javascriptEnabled: true
                // modifyVars: {
                //     red: '#03a9f4',
                //     blue: '#3eaf7c',
                //     orange: '#f08d49',
                //     'text-color': '#111'
                // }
            }
        }, // css预设器配置项
        modules: false // 启用 CSS modules for all css / pre-processor files.
    }
};

// 打包时根据环境动态生成env.config.js文件
let env = {};
Object.keys(process.env)
    .filter(key => key.startsWith('VUE_APP_'))
    .forEach(key => {
        env[key] = process.env[key];
    });

let create = {
    dir: 'public',
    file: 'env.config.js',
    content: `window.uimenv = ${JSON.stringify(env)};`
};

if (!fs.existsSync(create.dir)) {
    fs.mkdirSync(create.dir);
}
let configPath = create.dir + '/' + create.file;
fs.writeFileSync(configPath, create.content);
