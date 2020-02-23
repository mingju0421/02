const Koa = require('koa');
const koaBody = require("koa-body"); // 读取 post 请求体

const router = require('./koaRoute.js');
const app = new Koa();
// 解析post请求体
app.use(koaBody());

app.use(async (ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", "*");
    return next();
});

// 路由挂载
app.use(router.routes());

app.listen(3000);