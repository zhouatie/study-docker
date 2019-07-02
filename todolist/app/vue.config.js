module.exports = {
    baseUrl: '/',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://192.168.1.105:4000',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}