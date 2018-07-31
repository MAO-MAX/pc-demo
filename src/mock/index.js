/**
 * mock 数据
 */
import {baseUrl} from '../config.js';
// 引入mocjs
const Mock = require('mockjs');
// import Mock from 'mockjs';

// 获取mock.Random对象
const Random = Mock.Random;

// 设置ajax反应时间
Mock.setup({
  timeout: '200-600'
});

// 定义一组假数据模板
const newsList = function () {
  let list = [];
  for (let i = 0; i < 20; i++) {
    let item = {
      title: Random.csentence(5, 30),
      pic: Random.dataImage('300*250', 'mock图片'),
      auchor: Random.cname(),
      date: Random.date() + ' ' + Random.time()
    };
    list.push(item);
  }
  return list;
};

// 拦截请求返回假数据
Mock.mock(baseUrl + '/news/getList', newsList);
