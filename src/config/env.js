/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * 
 */

let baseUrl = '';
let routerMode = 'history';
let imgBaseUrl = '';
if (process.env.NODE_ENV == 'development') {
  baseUrl = "http://thjceshi.s1.natapp.cc/onlineRetailers-web";
} else if (process.env.NODE_ENV == 'production') {
  routerMode = 'hash';
  baseUrl = "http://wyb.yindantech.com";
  // baseUrl = "http://192.168.3.50:8080/onlineRetailers-web";
  baseUrl = "http://www.yindantech.com:8885/onlineRetailers-web";
  // baseUrl = "http://thjceshi.s1.natapp.cc/onlineRetailers-web";
}

export {
  baseUrl,
  routerMode,
  imgBaseUrl
}
