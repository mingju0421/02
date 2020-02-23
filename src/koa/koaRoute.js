let Router = require("koa-router");
let router = new Router()





const setOption = {
    path: '/setoption',
    async handle (ctx, next) {
        // 获取请求体
        let params = ctx;
        // 处理逻辑
        console.log(params)
        // 返回数据
        ctx.body = { res: "SUCCESS", data: '', code: 2000 };
    }
}
router.all(setOption.path, setOption.handle)
const getOption = {
    path: 'getopiton',
    async handle ( ctx, next) {
        // 获取请求体
        let params = ctx.response.body;
        // 处理逻辑
        console.log(params)
        // 返回数据
        ctx.body = { res: "SUCCESS", data: '', code: 2000 };
    }
}
router.all(getOption.path, getOption.handle)

module.exports = router;