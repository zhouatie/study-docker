module.exports = {
    baseUrl: '/',
    devServer: {
        proxy: {
            '/api': {
                target: 'nodejs:3000',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}