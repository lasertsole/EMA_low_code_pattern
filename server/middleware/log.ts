export default defineEventHandler((event) => {
  console.log('有新请求: ' + getRequestURL(event));
  // 中间件不应返回任何内容，否则会中断请求链
});
