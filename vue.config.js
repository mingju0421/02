
module.exports = {
    // devServer: {
    //     proxy: {
    //         // '/infra/api': {
    //         //     target: 'http://172.17.172.64',
    //         //     // target: 'http://172.17.171.244',
    //         //     // secure: false,
    //         //     changeOrigin: true,
    //         //     secure: false
    //         // },
    //         // '/dpservice/api': {
    //         //     target: 'http://172.17.172.64',
    //         //     // target: 'http://172.17.171.244',
    //         //     secure: false,
    //         //     changeOrigin: true,
    //         // },
    //         '': {
    //             target: 'http://localhost:3000/',
    //             // target: 'http://172.17.171.244',
    //             // target: 'https://devsl.lenovomm.com/',
    //             // target: 'http://172.17.171.244/oceanstream/',
    //             changeOrigin: true,
    //             secure: false
    //         },
    //     }
    // },
    devServer: {
        proxy: {
            '': {
                target: 'http://localhost:3000/',
                changeOrigin: true,
                ws: true,
                pathRewrite: {

                }
            }
        }
    }
};