// 配置编译环境和线上环境之间的切换
let baseUrl = ''
if (process.env.NODE_ENV === 'development') {
  // 线上服务器
  // baseUrl = "http://token-api.niren.org/api/v1"
  // 测试服务器
    baseUrl = 'http://114.115.212.12:8081/api/v1'
} else if (process.env.NODE_ENV === 'production') {
  // 从服务器中获取IP变量，没有使用测试服务器地址
    baseUrl = process.env.API_BASE_URL ? process.env.API_BASE_URL : 'http://114.115.212.12:8081/api/v1'
}
export {
  baseUrl
}
