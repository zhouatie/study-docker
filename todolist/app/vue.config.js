module.exports = {
    baseUrl: '/',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:4000',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}